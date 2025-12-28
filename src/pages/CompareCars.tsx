import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GitCompareArrows, X, Plus, ChevronDown, ChevronUp, Trophy, ArrowLeft } from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CompareCars: React.FC = () => {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, clearCompare, getCarById, getAllCars } = useCars();
  
  const comparedCars = compareList.map((id) => getCarById(id)).filter(Boolean);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  const formatKm = (km: number) => {
    return km.toLocaleString('en-IN');
  };

  // Find best values
  const getBestValue = (key: 'price' | 'kmDriven' | 'year') => {
    if (comparedCars.length < 2) return null;
    if (key === 'price' || key === 'kmDriven') {
      const minValue = Math.min(...comparedCars.map((car) => car![key]));
      return comparedCars.find((car) => car![key] === minValue)?.id;
    }
    if (key === 'year') {
      const maxValue = Math.max(...comparedCars.map((car) => car![key]));
      return comparedCars.find((car) => car![key] === maxValue)?.id;
    }
    return null;
  };

  const bestPrice = getBestValue('price');
  const bestKm = getBestValue('kmDriven');
  const bestYear = getBestValue('year');

  const compareRows = [
    { 
      label: 'Price', 
      getValue: (car: any) => formatPrice(car.price),
      bestId: bestPrice,
      icon: '💰'
    },
    { 
      label: 'Year', 
      getValue: (car: any) => car.year,
      bestId: bestYear,
      icon: '📅'
    },
    { 
      label: 'KM Driven', 
      getValue: (car: any) => `${formatKm(car.kmDriven)} km`,
      bestId: bestKm,
      icon: '🛣️'
    },
    { 
      label: 'Fuel Type', 
      getValue: (car: any) => car.fuelType,
      icon: '⛽'
    },
    { 
      label: 'Transmission', 
      getValue: (car: any) => car.transmission,
      icon: '⚙️'
    },
    { 
      label: 'Ownership', 
      getValue: (car: any) => car.ownership,
      icon: '👤'
    },
    { 
      label: 'Engine', 
      getValue: (car: any) => car.engine,
      icon: '🔧'
    },
    { 
      label: 'Power', 
      getValue: (car: any) => car.power,
      icon: '⚡'
    },
    { 
      label: 'Mileage', 
      getValue: (car: any) => car.mileage,
      icon: '📊'
    },
    { 
      label: 'Location', 
      getValue: (car: any) => car.location,
      icon: '📍'
    },
  ];

  if (comparedCars.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <GitCompareArrows className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              No cars to compare
            </h2>
            <p className="text-muted-foreground mb-6">
              Add up to 3 cars to compare their specifications side by side.
            </p>
            <Button onClick={() => navigate('/')} className="btn-gold">
              Browse Cars
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Compare <span className="text-gradient">Cars</span>
            </h1>
            <p className="text-muted-foreground">
              Comparing {comparedCars.length} car{comparedCars.length > 1 ? 's' : ''}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              clearCompare();
              toast.success('Comparison cleared');
            }}
            className="border-border text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Car Headers */}
            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${Math.min(comparedCars.length + 1, 4)}, 1fr)` }}>
              {/* Empty cell for row labels */}
              <div className="hidden md:block" />
              
              {comparedCars.map((car) => (
                <div 
                  key={car!.id} 
                  className="relative bg-card rounded-xl border border-border p-4 group"
                >
                  <button
                    onClick={() => {
                      removeFromCompare(car!.id);
                      toast.success('Removed from compare');
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <Link to={`/car/${car!.id}`} className="block">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <img 
                        src={car!.images[0]} 
                        alt={`${car!.brand} ${car!.model}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/20 border mb-2">
                      {car!.brand}
                    </Badge>
                    <h3 className="font-display font-semibold text-foreground text-lg line-clamp-1">
                      {car!.model}
                    </h3>
                  </Link>
                </div>
              ))}

              {/* Add more cars slot */}
              {comparedCars.length < 3 && (
                <Link 
                  to="/"
                  className="flex flex-col items-center justify-center bg-muted/50 rounded-xl border border-dashed border-border p-8 hover:border-accent hover:bg-accent/5 transition-colors min-h-[280px]"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Plus className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm">Add Car</p>
                </Link>
              )}
            </div>

            {/* Comparison Rows */}
            <div className="space-y-2">
              {compareRows.map(({ label, getValue, bestId, icon }) => (
                <div 
                  key={label}
                  className="grid gap-4 p-4 rounded-lg bg-muted/50"
                  style={{ gridTemplateColumns: `repeat(${Math.min(comparedCars.length + 1, 4)}, 1fr)` }}
                >
                  {/* Row label */}
                  <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                  
                  {/* Values */}
                  {comparedCars.map((car) => (
                    <div 
                      key={car!.id}
                      className={`flex items-center gap-2 font-semibold ${
                        bestId === car!.id ? 'text-green-500' : 'text-foreground'
                      }`}
                    >
                      {bestId === car!.id && (
                        <Trophy className="w-4 h-4 text-accent" />
                      )}
                      {getValue(car)}
                    </div>
                  ))}

                  {/* Empty cell for add slot */}
                  {comparedCars.length < 3 && <div />}
                </div>
              ))}
            </div>

            {/* Features Comparison */}
            <div className="mt-8">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Features</h3>
              <div 
                className="grid gap-4 p-4 rounded-lg bg-muted/50"
                style={{ gridTemplateColumns: `repeat(${Math.min(comparedCars.length + 1, 4)}, 1fr)` }}
              >
                <div />
                {comparedCars.map((car) => (
                  <div key={car!.id} className="flex flex-wrap gap-1">
                    {car!.features.map((feature) => (
                      <Badge 
                        key={feature} 
                        variant="secondary" 
                        className="text-xs bg-card text-foreground"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                ))}
                {comparedCars.length < 3 && <div />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompareCars;
