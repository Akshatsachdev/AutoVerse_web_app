import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, VolumeX, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface VideoHeroProps {
  onExplore: () => void;
}

const VideoHero: React.FC<VideoHeroProps> = ({ onExplore }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920"
      >
        <source
          src="https://cdn.pixabay.com/video/2020/08/12/47456-449623750_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-20">
        <div className={`max-w-3xl transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Brand Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Featured Launch 2024</span>
          </div>

          {/* Brand Name */}
          <h2 className="text-lg md:text-xl text-muted-foreground font-medium mb-2 opacity-0 animate-fade-up delay-100">
            PORSCHE
          </h2>

          {/* Car Model */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-4 opacity-0 animate-fade-up delay-200">
            Cayenne <span className="text-gradient">Turbo</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-8 max-w-xl opacity-0 animate-fade-up delay-300">
            Unleash the extraordinary. Where power meets precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-400">
            <Button
              onClick={onExplore}
              className="btn-gold group text-lg px-8 py-6"
            >
              Explore Used Cars
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => navigate('/compare')}
              variant="outline"
              className="btn-outline-gold text-lg px-8 py-6"
            >
              Compare Cars
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full glass hover:bg-card/90 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <Play className={`w-5 h-5 text-foreground ${isPlaying ? 'hidden' : ''}`} />
            <div className={`w-5 h-5 flex items-center justify-center gap-1 ${!isPlaying ? 'hidden' : ''}`}>
              <div className="w-1 h-4 bg-foreground rounded-full" />
              <div className="w-1 h-4 bg-foreground rounded-full" />
            </div>
          </button>
          <button
            onClick={toggleMute}
            className="p-3 rounded-full glass hover:bg-card/90 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-foreground" />
            ) : (
              <Volume2 className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Skip Button */}
        <button
          onClick={onExplore}
          className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Skip →
        </button>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
};

export default VideoHero;
