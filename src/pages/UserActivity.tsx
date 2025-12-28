import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, GitCompareArrows, Heart, Car, Trash2, ArrowLeft, 
  History, Clock, ShoppingCart, Tag
} from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const UserActivity: React.FC = () => {
  const navigate = useNavigate();
  const { 
    getCarById, 
    viewHistory, 
    compareHistory, 
    buyInterests, 
    userCars,
    clearViewHistory,
    clearCompareHistory,
    clearBuyInterests,
    removeUserCar
  } = useCars();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  const handleDeleteUserCar = (carId: string) => {
    removeUserCar(carId);
    toast.success('Car listing removed');
  };

  const renderActivityItem = (
    carId: string, 
    timestamp: string, 
    actionType: string,
    actionIcon: React.ElementType,
    status?: string,
    onDelete?: () => void
  ) => {
    const car = getCarById(carId);
    if (!car) return null;

    const ActionIcon = actionIcon;

    return (
      <div 
        key={`${carId}-${timestamp}`}
        className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all"
      >
        {/* Car Image */}
        <Link to={`/car/${carId}`} className="flex-shrink-0">
          <div className="w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden bg-muted">
            <img 
              src={car.images[0]} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Car Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/car/${carId}`} className="hover:underline">
            <h4 className="font-display font-semibold text-foreground truncate">
              {car.brand} {car.model}
            </h4>
          </Link>
          <p className="text-sm text-muted-foreground">{car.year} • {formatPrice(car.price)}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(timestamp)}
            </span>
            {status && (
              <Badge variant="secondary" className="text-xs">
                {status}
              </Badge>
            )}
          </div>
        </div>

        {/* Action Type Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
            <ActionIcon className="w-3 h-3" />
            {actionType}
          </span>
        </div>

        {/* Delete button for user cars */}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  };

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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-accent/10">
              <History className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              My <span className="text-gradient">Activity</span>
            </h1>
          </div>
          <p className="text-muted-foreground">
            Track your browsing history, interests, and listings.
          </p>
        </div>

        <Tabs defaultValue="viewed" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-8 h-auto gap-2 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger 
              value="viewed" 
              className="flex items-center gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-accent"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Viewed</span>
              {viewHistory.length > 0 && (
                <Badge variant="secondary" className="ml-1">{viewHistory.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="compared"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-accent"
            >
              <GitCompareArrows className="w-4 h-4" />
              <span className="hidden sm:inline">Compared</span>
              {compareHistory.length > 0 && (
                <Badge variant="secondary" className="ml-1">{compareHistory.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="interests"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-accent"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Interests</span>
              {buyInterests.length > 0 && (
                <Badge variant="secondary" className="ml-1">{buyInterests.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="listings"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-accent"
            >
              <Tag className="w-4 h-4" />
              <span className="hidden sm:inline">My Listings</span>
              {userCars.length > 0 && (
                <Badge variant="secondary" className="ml-1">{userCars.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Viewed Cars */}
          <TabsContent value="viewed" className="space-y-4">
            {viewHistory.length > 0 ? (
              <>
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      clearViewHistory();
                      toast.success('View history cleared');
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
                {viewHistory.map((item) => 
                  renderActivityItem(item.carId, item.timestamp, 'Viewed', Eye)
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Eye className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  No viewed cars yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start browsing to see your viewing history here.
                </p>
                <Button onClick={() => navigate('/')}>Browse Cars</Button>
              </div>
            )}
          </TabsContent>

          {/* Compared Cars */}
          <TabsContent value="compared" className="space-y-4">
            {compareHistory.length > 0 ? (
              <>
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      clearCompareHistory();
                      toast.success('Compare history cleared');
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
                {compareHistory.map((item) => 
                  renderActivityItem(item.carId, item.timestamp, 'Compared', GitCompareArrows)
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <GitCompareArrows className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  No comparisons yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Compare cars to see your history here.
                </p>
                <Button onClick={() => navigate('/compare')}>Start Comparing</Button>
              </div>
            )}
          </TabsContent>

          {/* Buy Interests */}
          <TabsContent value="interests" className="space-y-4">
            {buyInterests.length > 0 ? (
              <>
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      clearBuyInterests();
                      toast.success('Interest history cleared');
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
                {buyInterests.map((item) => 
                  renderActivityItem(item.carId, item.timestamp, 'Interested', ShoppingCart, item.status)
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  No interests yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Show interest in a car to track it here.
                </p>
                <Button onClick={() => navigate('/')}>Browse Cars</Button>
              </div>
            )}
          </TabsContent>

          {/* User Listings */}
          <TabsContent value="listings" className="space-y-4">
            {userCars.length > 0 ? (
              <>
                {userCars.map((car) => (
                  <div 
                    key={car.id}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all"
                  >
                    {/* Car Image */}
                    <Link to={`/car/${car.id}`} className="flex-shrink-0">
                      <div className="w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={car.images[0]} 
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    {/* Car Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/car/${car.id}`} className="hover:underline">
                        <h4 className="font-display font-semibold text-foreground truncate">
                          {car.brand} {car.model}
                        </h4>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {car.year} • {formatPrice(car.price)}
                      </p>
                      <Badge className="mt-1 bg-green-500/10 text-green-500 border-green-500/20 border">
                        User Listed
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/sell?edit=${car.id}`)}
                        className="border-border"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUserCar(car.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-16">
                <Car className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  No listings yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  List your car for sale to see it here.
                </p>
                <Button onClick={() => navigate('/sell')}>Sell Your Car</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserActivity;
