import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { SaltBlock } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react';

interface LeafletSaltMapProps {
  blocks: SaltBlock[];
  selectedBlockId: string;
  onSelectBlock: (id: string) => void;
}

// Component to dynamically re-center map when selected block changes
const MapRecenter: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng], 14, { animate: true });
  }, [lat, lng, map]);
  return null;
};

// Create custom HTML markers for Leaflet with status colors
const createCustomMarkerIcon = (block: SaltBlock, isSelected: boolean) => {
  const bgColor =
    block.status === 'ACTION_REQUIRED'
      ? '#DC2626'
      : block.status === 'MONITORING'
      ? '#F59E0B'
      : '#16A34A';

  const ringStyle = isSelected
    ? 'box-shadow: 0 0 0 4px #2563EB, 0 8px 16px rgba(37,99,235,0.5); transform: scale(1.15); font-weight: 900;'
    : 'box-shadow: 0 4px 10px rgba(0,0,0,0.3);';

  const html = `
    <div style="
      background-color: ${bgColor};
      color: white;
      font-weight: 800;
      font-size: 11px;
      font-family: Inter, sans-serif;
      padding: 5px 10px;
      border-radius: 20px;
      border: 2px solid white;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
      cursor: pointer;
      ${ringStyle}
    ">
      <span>${block.id}</span>
      <span style="background: rgba(255,255,255,0.25); padding: 1px 5px; border-radius: 10px; font-size: 10px;">${block.currentEc}mS</span>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-salt-block-marker',
    iconSize: [85, 32],
    iconAnchor: [42, 16],
  });
};

export const LeafletSaltMap: React.FC<LeafletSaltMapProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
}) => {
  const navigate = useNavigate();
  const [mapType, setMapType] = React.useState<'satellite' | 'street'>('satellite');
  const [hasError, setHasError] = React.useState(false);

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[2];
  const centerLat = selectedBlock ? selectedBlock.lat : 36.654;
  const centerLng = selectedBlock ? selectedBlock.lng : -6.295;

  const tileUrl =
    mapType === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileAttribution =
    mapType === 'satellite'
      ? '&copy; <a href="https://www.esri.com/">Esri World Imagery</a> &copy; OpenStreetMap'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <div className="w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-900">
      {/* Map Control Bar Overlay */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-md">
        <button
          onClick={() => setMapType('satellite')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
            mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => setMapType('street')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
            mapType === 'street' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          OpenStreetMap
        </button>
      </div>

      {!hasError ? (
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full z-10"
        >
          <TileLayer attribution={tileAttribution} url={tileUrl} />
          <MapRecenter lat={selectedBlock.lat} lng={selectedBlock.lng} />

          {blocks.map((block) => {
            const isSelected = block.id === selectedBlockId;
            const customIcon = createCustomMarkerIcon(block, isSelected);

            return (
              <Marker
                key={block.id}
                position={[block.lat, block.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => onSelectBlock(block.id),
                }}
              >
                <Popup>
                  <div className="p-2 space-y-2 min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900">{block.name}</span>
                      <Badge
                        variant={
                          block.status === 'ACTION_REQUIRED'
                            ? 'danger'
                            : block.status === 'MONITORING'
                            ? 'warning'
                            : 'success'
                        }
                        size="sm"
                      >
                        {block.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500">{block.zone}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs py-1 border-y border-slate-100 font-semibold">
                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase">Salinity EC</span>
                        <span className="text-blue-600 font-bold">{block.currentEc} mS/cm</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase">Harvest Ready</span>
                        <span className="text-slate-900 font-bold">{block.harvestReadiness}%</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectBlock(block.id);
                        navigate('/operator/monitoring');
                      }}
                      className="w-full mt-1 py-1.5 px-3 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors"
                    >
                      View Telemetry <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
          <p className="text-sm font-semibold">Unable to load map tiles</p>
          <Button onClick={() => setHasError(false)} variant="secondary" size="sm">
            Retry Map Loading
          </Button>
        </div>
      )}
    </div>
  );
};
