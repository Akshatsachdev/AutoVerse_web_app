import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export interface FilterState {
  search: string;
  brand: string;
  fuelType: string;
  transmission: string;
  priceRange: [number, number];
}

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  brands: string[];
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, brands }) => {
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['All', 'Automatic', 'Manual'];

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    }
    return `₹${(price / 100000).toFixed(0)} L`;
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      brand: 'All',
      fuelType: 'All',
      transmission: 'All',
      priceRange: [0, 15000000],
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.brand !== 'All' ||
    filters.fuelType !== 'All' ||
    filters.transmission !== 'All' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 15000000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brand */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Brand</label>
        <Select value={filters.brand} onValueChange={(v) => updateFilter('brand', v)}>
          <SelectTrigger className="w-full bg-muted border-border">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Fuel Type</label>
        <Select value={filters.fuelType} onValueChange={(v) => updateFilter('fuelType', v)}>
          <SelectTrigger className="w-full bg-muted border-border">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            {fuelTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Transmission</label>
        <Select value={filters.transmission} onValueChange={(v) => updateFilter('transmission', v)}>
          <SelectTrigger className="w-full bg-muted border-border">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {transmissions.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-foreground mb-4 block">
          Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
        </label>
        <Slider
          value={filters.priceRange}
          onValueChange={(v) => updateFilter('priceRange', v as [number, number])}
          min={0}
          max={15000000}
          step={500000}
          className="w-full"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-border text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search Bar - Always visible */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by brand or model..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-12 pr-4 py-6 bg-muted border-border text-foreground placeholder:text-muted-foreground text-base"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter('search', '')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full border-border">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-background border-border">
            <SheetHeader>
              <SheetTitle className="text-foreground">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Filters;
