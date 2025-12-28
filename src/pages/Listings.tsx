import React, { useState, useMemo } from 'react';
import { useCars } from '@/contexts/CarContext';
import CarCard from '@/components/CarCard';
import Filters, { FilterState } from '@/components/Filters';
import Layout from '@/components/Layout';
import { Car } from 'lucide-react';

interface ListingsProps {
  embedded?: boolean;
}

const Listings: React.FC<ListingsProps> = ({ embedded = false }) => {
  const { getAllCars } = useCars();
  const allCars = getAllCars();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: 'All',
    fuelType: 'All',
    transmission: 'All',
    priceRange: [0, 15000000],
  });

  const brands = useMemo(() => {
    const brandSet = new Set(allCars.map((car) => car.brand));
    return Array.from(brandSet).sort();
  }, [allCars]);

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      const searchMatch =
        !filters.search ||
        car.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.search.toLowerCase());

      const brandMatch = filters.brand === 'All' || car.brand === filters.brand;
      const fuelMatch = filters.fuelType === 'All' || car.fuelType === filters.fuelType;
      const transmissionMatch = filters.transmission === 'All' || car.transmission === filters.transmission;
      const priceMatch = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];

      return searchMatch && brandMatch && fuelMatch && transmissionMatch && priceMatch;
    });
  }, [allCars, filters]);

  const content = (
    <div className="container mx-auto px-4 py-8">
      {/* Header - only show when not embedded */}
      {!embedded && (
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Browse Premium <span className="text-gradient">Used Cars</span>
          </h1>
          <p className="text-muted-foreground">
            {filteredCars.length} cars available
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <Filters filters={filters} onFilterChange={setFilters} brands={brands} />
          </div>
        </aside>

        {/* Car Grid */}
        <div className="flex-1">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Car className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                No cars found
              </h3>
              <p className="text-muted-foreground max-w-md">
                Try adjusting your filters or search criteria to find the perfect car for you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return <Layout>{content}</Layout>;
};

export default Listings;
