import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface ModelItem {
  id: string;
  image: string;
  brand: string;
  model: string;
  priceRange: string;
  status: 'New' | 'Upcoming';
  features: string[];
}

const upcomingModels: ModelItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    brand: 'BMW',
    model: 'i7 xDrive60',
    priceRange: '₹1.95 - 2.15 Cr',
    status: 'New',
    features: ['Electric', '625 km Range', '544 hp'],
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800',
    brand: 'Mercedes-Benz',
    model: 'EQS 580',
    priceRange: '₹1.55 - 1.70 Cr',
    status: 'New',
    features: ['Electric', '770 km Range', '523 hp'],
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    priceRange: '₹2.35 - 2.50 Cr',
    status: 'Upcoming',
    features: ['Electric', '412 km Range', '761 hp'],
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
    brand: 'Audi',
    model: 'e-tron GT RS',
    priceRange: '₹2.05 - 2.20 Cr',
    status: 'New',
    features: ['Electric', '488 km Range', '646 hp'],
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    brand: 'Tesla',
    model: 'Model S Plaid',
    priceRange: '₹1.30 - 1.45 Cr',
    status: 'Upcoming',
    features: ['Electric', '600 km Range', '1020 hp'],
  },
];

const UpcomingModels: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

      <div className="relative z-10">
        {/* Section header */}
        <div className={`max-w-7xl mx-auto px-4 mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Fresh Arrivals
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                New & <span className="text-gradient">Upcoming</span> Models
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-3 rounded-full bg-card border border-border hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-3 rounded-full bg-card border border-border hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4 snap-x snap-mandatory transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {upcomingModels.map((model, idx) => (
            <div 
              key={model.id}
              className="flex-shrink-0 w-[350px] md:w-[400px] snap-start"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="group h-full rounded-2xl bg-card border border-border overflow-hidden hover:shadow-elevated hover:border-accent/30 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={model.image} 
                    alt={`${model.brand} ${model.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Status badge */}
                  <Badge 
                    className={`absolute top-4 left-4 ${
                      model.status === 'New' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {model.status === 'Upcoming' && <Clock className="w-3 h-3 mr-1" />}
                    {model.status}
                  </Badge>

                  {/* Brand logo */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-sm font-medium text-white/80">{model.brand}</span>
                    <h3 className="text-2xl font-display font-bold text-white">{model.model}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <p className="text-xl font-display font-bold text-gradient mb-4">
                    {model.priceRange}
                  </p>

                  {/* CTA */}
                  <Button 
                    variant="outline"
                    className="w-full border-border hover:border-accent hover:bg-accent/5"
                    onClick={() => navigate('/')}
                  >
                    View Used Alternatives
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingModels;
