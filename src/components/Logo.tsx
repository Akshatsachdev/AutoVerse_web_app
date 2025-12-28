import React from 'react';
import { Car } from 'lucide-react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 blur-2xl bg-accent/30 rounded-full" />
        <div className="relative flex items-center gap-3">
          <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
            <Car className="w-10 h-10 text-accent" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-display font-bold tracking-tight">
              <span className="text-foreground">Auto</span>
              <span className="text-gradient">Vault</span>
            </span>
          </div>
        </div>
      </div>
      {showTagline && (
        <p className="mt-4 text-muted-foreground text-lg font-light tracking-wide opacity-0 animate-fade-up delay-300">
          Find Your Perfect Drive
        </p>
      )}
    </div>
  );
};

export default Logo;
