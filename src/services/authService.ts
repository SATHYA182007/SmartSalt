import { User, Role } from '../types';

export const DEMO_USERS: Record<Role, User> = {
  operator: {
    id: 'usr-op-101',
    email: 'operator@smartsalt.ai',
    name: 'Carlos Ruiz',
    role: 'operator',
    organization: 'Maris Salt Works Co.',
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
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (role === 'admin' || email.includes('admin')) {
      const user = DEMO_USERS.admin;
      localStorage.setItem('smartsalt_user', JSON.stringify(user));
      return user;
    }

    const user = DEMO_USERS.operator;
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
