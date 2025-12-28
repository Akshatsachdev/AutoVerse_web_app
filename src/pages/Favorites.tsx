import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import Layout from '@/components/Layout';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, getCarById, removeFromFavorites } = useCars();
  
  const favoriteCars = favorites.map((id) => getCarById(id)).filter(Boolean);

  const handleClearAll = () => {
    favorites.forEach((id) => removeFromFavorites(id));
    toast.success('All favorites cleared');
  };

  if (favoriteCars.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Save cars you like by clicking the heart icon. They'll appear here for easy access.
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
              Your <span className="text-gradient">Favorites</span>
            </h1>
            <p className="text-muted-foreground">
              {favoriteCars.length} car{favoriteCars.length > 1 ? 's' : ''} saved
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleClearAll}
            className="border-border text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCars.map((car) => (
            <CarCard key={car!.id} car={car!} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
