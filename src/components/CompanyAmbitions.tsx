import React, { useEffect, useRef, useState } from 'react';
import { Zap, Shield, Gauge, Cpu, Leaf, Award } from 'lucide-react';

interface AmbitionItem {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const ambitions: AmbitionItem[] = [
  {
    icon: Zap,
    title: 'Electric Mobility',
    description: 'Leading the transition to sustainable transportation with premium EV options',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Shield,
    title: 'Safety Innovation',
    description: 'Every vehicle undergoes rigorous safety checks and quality assurance',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Gauge,
    title: 'Performance Engineering',
    description: 'Curated selection of high-performance machines that thrill on every drive',
    color: 'from-orange-500 to-amber-400',
  },
  {
    icon: Cpu,
    title: 'Smart Technology',
    description: 'Modern vehicles equipped with cutting-edge connectivity and automation',
    color: 'from-purple-500 to-violet-400',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Committed to reducing carbon footprint through eco-conscious practices',
    color: 'from-teal-500 to-green-400',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest pre-owned luxury vehicles make it to our collection',
    color: 'from-accent to-amber-400',
  },
];

const CompanyAmbitions: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden bg-muted/30"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Our Vision
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Driving the <span className="text-gradient">Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just selling cars. We're shaping how the world experiences automotive excellence.
          </p>
        </div>

        {/* Ambition cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ambitions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className={`group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 
                           hover:border-accent/50 hover:shadow-elevated transition-all duration-500
                           ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} 
                               flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Hover line */}
                <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanyAmbitions;
