import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedRibbonProps {
  variant?: 'hero' | 'divider' | 'footer' | 'cta';
  className?: string;
}

export default function AnimatedRibbon({ variant = 'divider', className = '' }: AnimatedRibbonProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;

    if (variant === 'hero') {
      // Complex flowing animation for hero
      gsap.to(path, {
        attr: {
          d: 'M0,80 C150,60 300,100 450,70 C600,40 750,90 900,60 C1050,30 1200,80 1440,50 L1440,120 L0,120 Z',
        },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    } else if (variant === 'divider') {
      // Simple wave for dividers
      gsap.to(path, {
        attr: {
          d: 'M0,30 Q360,50 720,30 T1440,30 L1440,60 L0,60 Z',
        },
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      gsap.killTweensOf(path);
    };
  }, [variant]);

  const paths = {
    hero: 'M0,80 C150,100 300,60 450,90 C600,120 750,50 900,80 C1050,110 1200,40 1440,70 L1440,120 L0,120 Z',
    divider: 'M0,30 Q360,10 720,30 T1440,30 L1440,60 L0,60 Z',
    footer: 'M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z',
    cta: 'M0,40 Q360,20 720,40 T1440,40 L1440,80 L0,80 Z',
  };

  const heights = {
    hero: 'h-32',
    divider: 'h-16',
    footer: 'h-16',
    cta: 'h-20',
  };

  return (
    <div className={`relative overflow-hidden ${heights[variant]} ${className}`}>
      <svg
        ref={svgRef}
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        <defs>
          <linearGradient id={`ribbonGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C41A1F" />
            <stop offset="50%" stopColor="#E31E24" />
            <stop offset="100%" stopColor="#FF3B41" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={paths[variant]}
          fill={`url(#ribbonGrad-${variant})`}
          opacity={variant === 'hero' ? 0.15 : variant === 'cta' ? 1 : 0.8}
        />
        {variant === 'hero' && (
          <>
            <path
              d="M0,90 C200,70 400,110 600,80 C800,50 1000,100 1200,70 C1300,55 1380,85 1440,75"
              fill="none"
              stroke="#E31E24"
              strokeWidth="2"
              opacity="0.3"
            />
            <path
              d="M0,100 C300,80 500,120 800,90 C1100,60 1300,100 1440,85"
              fill="none"
              stroke="#FF3B41"
              strokeWidth="1.5"
              opacity="0.2"
            />
          </>
        )}
      </svg>
    </div>
  );
}
