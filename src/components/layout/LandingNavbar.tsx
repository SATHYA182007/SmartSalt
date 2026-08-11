import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, role } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const dashboardPath = role === 'admin' ? '/admin/dashboard' : '/operator/dashboard';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center py-1.5">
          <img
            src="/sslogo-transparent.png"
            alt="SmartSalt AI"
            className="h-13 sm:h-15 w-auto object-contain transition-transform hover:scale-105 drop-shadow-xs"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#platform" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
            Platform
          </a>
          <Link to="/how-it-works" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
            How It Works
          </Link>
          <a href="#hardware" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
            Hardware
          </a>
          <a href="#ai-intelligence" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
            AI Intelligence
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button onClick={() => navigate('/auth')} variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Access Dashboard
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#platform"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            Platform
          </a>
          <Link
            to="/how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            How It Works
          </Link>
          <a
            href="#hardware"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            Hardware
          </a>
          <a
            href="#ai-intelligence"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            AI Intelligence
          </a>
          <div className="pt-2">
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/auth');
              }}
              variant="primary"
              className="w-full"
            >
              Access Dashboard
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
