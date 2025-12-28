import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, GitCompareArrows, Fuel, Gauge, Calendar, MapPin, Check } from 'lucide-react';
import { Car, useCars } from '@/contexts/CarContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { addToFavorites, removeFromFavorites, isFavorite, addToCompare, removeFromCompare, isInCompare, compareList } = useCars();
  const isCarFavorite = isFavorite(car.id);
  const isCarInCompare = isInCompare(car.id);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  const formatKm = (km: number) => {
    if (km >= 1000) {
      return `${(km / 1000).toFixed(0)}k km`;
    }
    return `${km} km`;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCarFavorite) {
      removeFromFavorites(car.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(car.id);
      toast.success('Added to favorites');
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCarInCompare) {
      removeFromCompare(car.id);
      toast.success('Removed from compare');
    } else if (compareList.length >= 3) {
      toast.error('You can compare up to 3 cars only');
    } else {
      addToCompare(car.id);
      toast.success('Added to compare');
    }
  };

  // Determine deal type based on price and km
  const getDealBadge = () => {
    const pricePerKm = car.price / car.kmDriven;
    if (pricePerKm < 100) return { label: 'Great Deal', color: 'bg-green-500/10 text-green-500 border-green-500/20' };
    if (pricePerKm < 150) return { label: 'Fair Deal', color: 'bg-accent/10 text-accent border-accent/20' };
    return null;
  };

  const dealBadge = getDealBadge();

  return (
    <Link
      to={`/car/${car.id}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden card-hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {dealBadge && (
            <Badge className={`${dealBadge.color} border font-medium`}>
              {dealBadge.label}
            </Badge>
          )}
          {car.ownership === '1st Owner' && (
            <Badge className="bg-primary/10 text-primary border-primary/20 border font-medium">
              1st Owner
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-full transition-all ${
              isCarFavorite
                ? 'bg-red-500 text-white'
                : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Heart className={`w-4 h-4 ${isCarFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleCompareClick}
            className={`p-2.5 rounded-full transition-all ${
              isCarInCompare
                ? 'bg-accent text-accent-foreground'
                : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {isCarInCompare ? (
              <Check className="w-4 h-4" />
            ) : (
              <GitCompareArrows className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand & Model */}
        <div className="mb-3">
          <p className="text-sm text-accent font-medium">{car.brand}</p>
          <h3 className="text-lg font-display font-semibold text-foreground line-clamp-1">
            {car.model}
          </h3>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-display font-bold text-gradient">
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="w-4 h-4" />
            <span>{formatKm(car.kmDriven)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Fuel className="w-4 h-4" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
