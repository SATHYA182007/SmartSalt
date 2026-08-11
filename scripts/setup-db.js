import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres.xmzvsozvzwbdojylzgpz:Sathya%4001082007@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function setupDatabase() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🔌 Connecting to Supabase PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully to Supabase!');

    // 1. Create Tables Schema
    console.log('🛠️ Creating database tables...');

    await client.query(`
      -- Enable UUID extension
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      -- Users & Profiles table
      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'operator',
        organization TEXT DEFAULT 'Salinas del Atlántico',
        avatar_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Salt Evaporation Blocks / Pans table
      CREATE TABLE IF NOT EXISTS public.salt_blocks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        zone TEXT NOT NULL,
        target_ec NUMERIC NOT NULL,
        current_ec NUMERIC NOT NULL,
        temp NUMERIC NOT NULL,
        water_level NUMERIC NOT NULL,
        status TEXT NOT NULL DEFAULT 'NORMAL',
        crystallization_stage TEXT NOT NULL DEFAULT 'Intake',
        harvest_readiness NUMERIC NOT NULL DEFAULT 0,
        lat NUMERIC NOT NULL,
        lng NUMERIC NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- LoRaWAN Sensor Nodes table
      CREATE TABLE IF NOT EXISTS public.sensor_nodes (
        id TEXT PRIMARY KEY,
        block_id TEXT REFERENCES public.salt_blocks(id) ON DELETE SET NULL,
        block_name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'ONLINE',
        battery_level NUMERIC NOT NULL,
        signal_dbm NUMERIC NOT NULL,
        signal_quality TEXT NOT NULL DEFAULT 'EXCELLENT',
        ip67_status TEXT NOT NULL DEFAULT 'SEALED',
        calibration_status TEXT NOT NULL DEFAULT 'OK',
        last_seen TEXT NOT NULL,
        last_calibrated TEXT DEFAULT '2026-03-10',
        next_calibration_due TEXT DEFAULT '2026-06-10',
        sensor_types TEXT[] DEFAULT ARRAY['EC', 'Temp', 'WaterLevel'],
        firmware_version TEXT DEFAULT 'v2.4.1-lora',
        gateway_id TEXT DEFAULT 'GW-01',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- LoRaWAN Gateways table
      CREATE TABLE IF NOT EXISTS public.gateways (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'ONLINE',
        connected_nodes INT NOT NULL DEFAULT 16,
        signal_health NUMERIC NOT NULL DEFAULT 98.5,
        internet_backhaul TEXT NOT NULL DEFAULT '4G LTE Cellular',
        uptime_percent NUMERIC NOT NULL DEFAULT 99.9,
        ip_address TEXT NOT NULL,
        last_sync TEXT NOT NULL DEFAULT 'Just now',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Sensor Telemetry Logs table
      CREATE TABLE IF NOT EXISTS public.telemetry_logs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        block_id TEXT REFERENCES public.salt_blocks(id) ON DELETE CASCADE,
        ec NUMERIC NOT NULL,
        temp NUMERIC NOT NULL,
        water_level NUMERIC NOT NULL,
        recorded_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- AI Predictions & Insights table
      CREATE TABLE IF NOT EXISTS public.ai_predictions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        block_id TEXT REFERENCES public.salt_blocks(id) ON DELETE CASCADE,
        confidence NUMERIC NOT NULL,
        crystallization_stage TEXT NOT NULL,
        harvest_readiness NUMERIC NOT NULL,
        days_to_harvest NUMERIC NOT NULL,
        recommended_action TEXT NOT NULL,
        risk_level TEXT NOT NULL DEFAULT 'LOW',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Infrastructure Alerts Stream table
      CREATE TABLE IF NOT EXISTS public.alerts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        block_name TEXT NOT NULL,
        description TEXT NOT NULL,
        severity TEXT NOT NULL DEFAULT 'WARNING',
        status TEXT NOT NULL DEFAULT 'NEW',
        timestamp TEXT NOT NULL DEFAULT 'Just now',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Weather & Evaporation Forecasts table
      CREATE TABLE IF NOT EXISTS public.weather_forecasts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        date TEXT NOT NULL,
        temp NUMERIC NOT NULL,
        humidity NUMERIC NOT NULL,
        solar_radiation NUMERIC NOT NULL,
        rain_prob NUMERIC NOT NULL,
        evaporation_rate NUMERIC NOT NULL,
        risk_level TEXT NOT NULL DEFAULT 'OPTIMAL',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log('✅ Tables created successfully!');

    // 2. Insert Seed Data
    console.log('🌱 Seeding initial database records...');

    // Seed Profiles
    await client.query(`
      INSERT INTO public.profiles (email, full_name, role, organization, avatar_url)
      VALUES
        ('operator@smartsalt.ai', 'Carlos Ruiz', 'operator', 'Salinas del Atlántico', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
        ('admin@smartsalt.ai', 'Elena Vance', 'admin', 'SmartSalt Infrastructure', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150')
      ON CONFLICT (email) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        organization = EXCLUDED.organization,
        avatar_url = EXCLUDED.avatar_url;
    `);

    // Seed Salt Blocks
    await client.query(`
      INSERT INTO public.salt_blocks (id, name, zone, target_ec, current_ec, temp, water_level, status, crystallization_stage, harvest_readiness, lat, lng)
      VALUES
        ('PAN-A01', 'Evaporation Pan A-01', 'Concentration Zone 1', 180, 185, 34.2, 14.5, 'NORMAL', 'Concentration', 68, 36.654, -6.295),
        ('PAN-A02', 'Evaporation Pan A-02', 'Concentration Zone 1', 180, 192, 35.0, 13.8, 'NORMAL', 'Concentration', 74, 36.656, -6.293),
        ('PAN-B01', 'Crystallizer Pan B-01', 'Crystallization Zone 2', 250, 248, 36.5, 9.2, 'NORMAL', 'Crystallization', 92, 36.658, -6.291),
        ('PAN-B02', 'Crystallizer Pan B-02', 'Crystallization Zone 2', 250, 215, 33.8, 11.0, 'ACTION_REQUIRED', 'Pre-crystallization', 58, 36.660, -6.289),
        ('PAN-C01', 'Intake Pan C-01', 'Brine Storage Zone 3', 120, 115, 31.0, 22.0, 'NORMAL', 'Brine Intake', 25, 36.652, -6.297),
        ('PAN-C02', 'Intake Pan C-02', 'Brine Storage Zone 3', 120, 122, 31.5, 20.5, 'MONITORING', 'Brine Intake', 32, 36.650, -6.299)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        zone = EXCLUDED.zone,
        target_ec = EXCLUDED.target_ec,
        current_ec = EXCLUDED.current_ec,
        temp = EXCLUDED.temp,
        water_level = EXCLUDED.water_level,
        status = EXCLUDED.status,
        crystallization_stage = EXCLUDED.crystallization_stage,
        harvest_readiness = EXCLUDED.harvest_readiness,
        lat = EXCLUDED.lat,
        lng = EXCLUDED.lng;
    `);

    // Seed Sensor Nodes
    await client.query(`
      INSERT INTO public.sensor_nodes (id, block_id, block_name, status, battery_level, signal_dbm, signal_quality, ip67_status, calibration_status, last_seen, sensor_types, firmware_version, gateway_id)
      VALUES
        ('NODE-101', 'PAN-A01', 'Evaporation Pan A-01', 'ONLINE', 94, -68, 'EXCELLENT', 'SEALED', 'OK', '1 min ago', ARRAY['EC', 'Temp', 'WaterLevel'], 'v2.4.1-lora', 'GW-01'),
        ('NODE-102', 'PAN-A02', 'Evaporation Pan A-02', 'ONLINE', 91, -72, 'GOOD', 'SEALED', 'OK', '2 mins ago', ARRAY['EC', 'Temp', 'WaterLevel'], 'v2.4.1-lora', 'GW-01'),
        ('NODE-201', 'PAN-B01', 'Crystallizer Pan B-01', 'ONLINE', 88, -65, 'EXCELLENT', 'SEALED', 'OK', 'Just now', ARRAY['EC', 'Temp', 'Camera'], 'v2.4.2-vision', 'GW-02'),
        ('NODE-202', 'PAN-B02', 'Crystallizer Pan B-02', 'DEGRADED', 45, -92, 'POOR', 'CHECK_REQUIRED', 'CALIBRATION_DUE', '5 mins ago', ARRAY['EC', 'Temp', 'WaterLevel'], 'v2.3.9-legacy', 'GW-02'),
        ('NODE-301', 'PAN-C01', 'Intake Pan C-01', 'ONLINE', 98, -59, 'EXCELLENT', 'SEALED', 'OK', 'Just now', ARRAY['EC', 'Temp', 'WaterLevel'], 'v2.4.1-lora', 'GW-03'),
        ('NODE-302', 'PAN-C02', 'Intake Pan C-02', 'OFFLINE', 12, -110, 'NO_SIGNAL', 'SEALED', 'CALIBRATION_DUE', '4 hours ago', ARRAY['EC', 'Temp'], 'v2.3.9-legacy', 'GW-03')
      ON CONFLICT (id) DO UPDATE SET
        block_id = EXCLUDED.block_id,
        block_name = EXCLUDED.block_name,
        status = EXCLUDED.status,
        battery_level = EXCLUDED.battery_level,
        signal_dbm = EXCLUDED.signal_dbm,
        signal_quality = EXCLUDED.signal_quality,
        ip67_status = EXCLUDED.ip67_status,
        calibration_status = EXCLUDED.calibration_status,
        last_seen = EXCLUDED.last_seen;
    `);

    // Seed Gateways
    await client.query(`
      INSERT INTO public.gateways (id, name, location, status, connected_nodes, signal_health, internet_backhaul, uptime_percent, ip_address, last_sync)
      VALUES
        ('GW-01', 'Gateway Alpha Mast', 'North Sector Tower (Pan A-01)', 'ONLINE', 16, 98.5, '4G LTE Cellular Backhaul', 99.9, '192.168.10.1', 'Just now'),
        ('GW-02', 'Gateway Beta Mast', 'East Crystallizer Pier (Pan B-01)', 'ONLINE', 18, 96.2, 'Starlink Satellite Backhaul', 99.8, '192.168.10.2', '1 min ago'),
        ('GW-03', 'Gateway Gamma Mast', 'South Intake Pumping Station', 'ONLINE', 14, 94.0, '4G LTE Cellular Backhaul', 99.5, '192.168.10.3', '3 mins ago')
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        location = EXCLUDED.location,
        status = EXCLUDED.status,
        connected_nodes = EXCLUDED.connected_nodes,
        signal_health = EXCLUDED.signal_health,
        internet_backhaul = EXCLUDED.internet_backhaul,
        uptime_percent = EXCLUDED.uptime_percent,
        ip_address = EXCLUDED.ip_address,
        last_sync = EXCLUDED.last_sync;
    `);

    // Seed Alerts
    await client.query(`
      INSERT INTO public.alerts (id, title, block_name, description, severity, status, timestamp)
      VALUES
        ('ALT-901', 'Rapid Salinity Dilution Warning', 'Crystallizer Pan B-02', 'EC level dropped from 235 mS/cm to 215 mS/cm in 90 mins due to local rainfall. Sluice gate closure recommended.', 'CRITICAL', 'NEW', '12 mins ago'),
        ('ALT-902', 'Low Battery Threshold Alert', 'Intake Pan C-02 (NODE-302)', 'LiFePO4 battery reached 12%. Node telemetry uplink rate throttled to power-save mode.', 'WARNING', 'NEW', '45 mins ago'),
        ('ALT-903', 'Optimal Harvest Window Reached', 'Crystallizer Pan B-01', 'Sodium chloride crust purity hit 98.4%. Recommended harvest within 36 hours for peak salt yield.', 'INFO', 'ACKNOWLEDGED', '2 hours ago')
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        block_name = EXCLUDED.block_name,
        description = EXCLUDED.description,
        severity = EXCLUDED.severity,
        status = EXCLUDED.status,
        timestamp = EXCLUDED.timestamp;
    `);

    // Enable Row Level Security (RLS) & Public Access Policies for seamless client queries
    await client.query(`
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.salt_blocks ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.sensor_nodes ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.gateways ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.telemetry_logs ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.weather_forecasts ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Public select profiles" ON public.profiles;
      CREATE POLICY "Public select profiles" ON public.profiles FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Public update profiles" ON public.profiles;
      CREATE POLICY "Public update profiles" ON public.profiles FOR ALL USING (true);

      DROP POLICY IF EXISTS "Public select salt_blocks" ON public.salt_blocks;
      CREATE POLICY "Public select salt_blocks" ON public.salt_blocks FOR ALL USING (true);

      DROP POLICY IF EXISTS "Public select sensor_nodes" ON public.sensor_nodes;
      CREATE POLICY "Public select sensor_nodes" ON public.sensor_nodes FOR ALL USING (true);

      DROP POLICY IF EXISTS "Public select gateways" ON public.gateways;
      CREATE POLICY "Public select gateways" ON public.gateways FOR ALL USING (true);

      DROP POLICY IF EXISTS "Public select telemetry_logs" ON public.telemetry_logs;
      CREATE POLICY "Public select telemetry_logs" ON public.telemetry_logs FOR ALL USING (true);

      DROP POLICY IF EXISTS "Public select ai_predictions" ON public.ai_predictions;
      CREATE POLICY "Public select ai_predictions" ON public.ai_predictions FOR ALL USING (true);

      DROP POLICY IF EXISTS "Public select alerts" ON public.alerts;
      CREATE POLICY "Public select alerts" ON public.alerts FOR ALL USING (true);

      DROP POLICY IF EXISTS "Public select weather_forecasts" ON public.weather_forecasts;
      CREATE POLICY "Public select weather_forecasts" ON public.weather_forecasts FOR ALL USING (true);
    `);

    console.log('✅ RLS Policies & Permissions created!');
    console.log('🎉 Database setup completed successfully!');

  } catch (err) {
    console.error('❌ Error executing database script:', err);
  } finally {
    await client.end();
  }
}

setupDatabase();
