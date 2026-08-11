import { User, Role } from '../types';
import { supabase } from '../lib/supabase';

export const DEMO_USERS: Record<Role, User> = {
  operator: {
    id: 'usr-op-101',
    email: 'operator@smartsalt.ai',
    name: 'Carlos Ruiz',
    role: 'operator',
    organization: 'Salinas del Atlántico',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastLogin: new Date().toISOString(),
  },
  admin: {
    id: 'usr-adm-202',
    email: 'admin@smartsalt.ai',
    name: 'Elena Rostova',
    role: 'admin',
    organization: 'SmartSalt IoT Infrastructure',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    lastLogin: new Date().toISOString(),
  },
};

export const authService = {
  DEMO_USERS,
  async login(email: string, role?: Role): Promise<User> {
    const selectedRole = role || (email.includes('admin') ? 'admin' : 'operator');
    let user = DEMO_USERS[selectedRole];

    try {
      const { data } = await supabase.from('profiles').select('*').eq('email', email).single();
      if (data) {
        user = {
          id: data.id,
          email: data.email,
          name: data.full_name,
          role: data.role as Role,
          organization: data.organization || 'Salinas del Atlántico',
          avatarUrl: data.avatar_url || user.avatarUrl,
          lastLogin: new Date().toISOString(),
        };
      }
    } catch {
      // Graceful fallback to DEMO_USERS
    }

    localStorage.setItem('smartsalt_user', JSON.stringify(user));
    return user;
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem('smartsalt_user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  logout(): void {
    localStorage.removeItem('smartsalt_user');
  },
};
