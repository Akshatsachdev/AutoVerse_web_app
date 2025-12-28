import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, GitCompareArrows, Sun, Moon, Menu, X, Car, Plus } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCars } from '@/contexts/CarContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { favorites, compareList } = useCars();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { path: '/', label: 'Browse Cars', icon: Car },
    { path: '/compare', label: 'Compare', icon: GitCompareArrows, badge: compareList.length },
    { path: '/favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { path: '/sell', label: 'Sell Your Car', icon: Plus },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ path, label, icon: Icon, badge }) => (
            <Link
              key={path}
              to={path}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive(path)
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-accent text-accent-foreground rounded-full">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-border">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map(({ path, label, icon: Icon, badge }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive(path)
                        ? 'bg-accent/10 text-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                    {badge !== undefined && badge > 0 && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-accent text-accent-foreground rounded-full">
                        {badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
