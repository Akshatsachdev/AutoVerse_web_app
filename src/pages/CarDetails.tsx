import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Heart, GitCompareArrows, MapPin, Calendar, Gauge, Fuel, 
  Settings, Users, Palette, ChevronLeft, ChevronRight, Check, 
  Calculator, ArrowLeft, Share2, ShoppingCart, Tag, Pencil, Trash2
} from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getCarById, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite, 
    addToCompare, 
    removeFromCompare, 
    isInCompare, 
    compareList,
    addToViewHistory,
    addBuyInterest,
    buyInterests,
    isUserCar,
    removeUserCar
  } = useCars();
  
  const car = getCarById(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [emiData, setEmiData] = useState({
    downPayment: 20,
    tenure: 60,
    interestRate: 9,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const hasTrackedView = useRef(false);

  // Track view when component mounts
  useEffect(() => {
    if (id && car && !hasTrackedView.current) {
      addToViewHistory(id);
      hasTrackedView.current = true;
    }
  }, [id, car, addToViewHistory]);

  if (!car) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Car not found</h2>
          <Button onClick={() => navigate('/')}>Back to listings</Button>
        </div>
      </Layout>
    );
  }

  const isCarFavorite = isFavorite(car.id);
  const isCarInCompare = isInCompare(car.id);
  const isUserListed = isUserCar(car.id);
  const hasInterest = buyInterests.some(item => item.carId === car.id);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  const formatKm = (km: number) => {
    return km.toLocaleString('en-IN');
  };

  const handleFavoriteClick = () => {
    if (isCarFavorite) {
      removeFromFavorites(car.id);
      toast.success('Removed from favorites');
    } else {
      addToFavorites(car.id);
      toast.success('Added to favorites');
    }
  };

  const handleCompareClick = () => {
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

  const handleBuyInterest = () => {
    addBuyInterest(car.id);
    toast.success('Interest registered! We\'ll notify the seller.');
  };

  const handleDeleteCar = () => {
    removeUserCar(car.id);
    toast.success('Car listing deleted');
    navigate('/');
  };

  const calculateEMI = () => {
    const principal = car.price * (1 - emiData.downPayment / 100);
    const monthlyRate = emiData.interestRate / 12 / 100;
    const months = emiData.tenure;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'KM Driven', value: `${formatKm(car.kmDriven)} km` },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Users, label: 'Ownership', value: car.ownership },
    { icon: MapPin, label: 'Location', value: car.location },
    { icon: Palette, label: 'Color', value: car.color },
  ];

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              <img
                src={car.images[currentImageIndex]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              
              {/* User Listed Badge */}
              {isUserListed && (
                <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                  <Tag className="w-3 h-3 mr-1" />
                  User Listed
                </Badge>
              )}
              
              {/* Navigation arrows */}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === car.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm">
                {currentImageIndex + 1} / {car.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {car.images.length > 1 && (
              <div className="flex gap-3">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-accent/10 text-accent border-accent/20 border">{car.brand}</Badge>
                {car.ownership === '1st Owner' && (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 border">1st Owner</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                {car.model}
              </h1>
              <p className="text-muted-foreground">{car.description}</p>
            </div>

            {/* Price */}
            <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="text-4xl font-display font-bold text-gradient">
                {formatPrice(car.price)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {!isUserListed && (
                <Button
                  onClick={handleBuyInterest}
                  disabled={hasInterest}
                  className={hasInterest ? 'bg-green-500 hover:bg-green-600' : 'btn-gold'}
                >
                  {hasInterest ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Interest Registered
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Show Interest
                    </>
                  )}
                </Button>
              )}
              
              {isUserListed && (
                <>
                  <Button
                    onClick={() => navigate(`/sell?edit=${car.id}`)}
                    className="btn-gold"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Listing
                  </Button>
                  <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Listing</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this car listing? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteCar}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
              
              <Button
                onClick={handleFavoriteClick}
                variant={isCarFavorite ? 'default' : 'outline'}
                className={isCarFavorite ? 'bg-red-500 hover:bg-red-600' : 'border-border'}
              >
                <Heart className={`w-4 h-4 mr-2 ${isCarFavorite ? 'fill-current' : ''}`} />
                {isCarFavorite ? 'Saved' : 'Save'}
              </Button>
              <Button
                onClick={handleCompareClick}
                variant={isCarInCompare ? 'default' : 'outline'}
                className={isCarInCompare ? 'bg-accent text-accent-foreground' : 'border-border'}
              >
                {isCarInCompare ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <GitCompareArrows className="w-4 h-4 mr-2" />
                )}
                {isCarInCompare ? 'In Compare' : 'Compare'}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-border">
                    <Calculator className="w-4 h-4 mr-2" />
                    EMI Calculator
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">EMI Calculator</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div>
                      <Label className="text-foreground">Down Payment: {emiData.downPayment}%</Label>
                      <Slider
                        value={[emiData.downPayment]}
                        onValueChange={([v]) => setEmiData({ ...emiData, downPayment: v })}
                        min={10}
                        max={50}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">Tenure: {emiData.tenure} months</Label>
                      <Slider
                        value={[emiData.tenure]}
                        onValueChange={([v]) => setEmiData({ ...emiData, tenure: v })}
                        min={12}
                        max={84}
                        step={12}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground">Interest Rate: {emiData.interestRate}%</Label>
                      <Slider
                        value={[emiData.interestRate]}
                        onValueChange={([v]) => setEmiData({ ...emiData, interestRate: v })}
                        min={6}
                        max={15}
                        step={0.5}
                        className="mt-2"
                      />
                    </div>
                    <Separator />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Estimated Monthly EMI</p>
                      <p className="text-3xl font-display font-bold text-gradient">
                        ₹{calculateEMI().toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Down payment: {formatPrice(car.price * emiData.downPayment / 100)}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" className="text-muted-foreground">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Separator />

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engine & Performance */}
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Engine & Performance</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-xs text-muted-foreground mb-1">Engine</p>
                  <p className="font-semibold text-foreground">{car.engine}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-xs text-muted-foreground mb-1">Power</p>
                  <p className="font-semibold text-foreground">{car.power}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-xs text-muted-foreground mb-1">Mileage</p>
                  <p className="font-semibold text-foreground">{car.mileage}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="bg-muted text-foreground">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetails;
