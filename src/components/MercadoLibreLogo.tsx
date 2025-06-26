
import type { SVGProps } from 'react';

export function MercadoLibreLogo(props: SVGProps<SVGSVGElement>) {
  const textX = 94; 
  const textY = "50%";

  return (
    <svg viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg" {...props} aria-label="LP Vision Logo">
      <rect width="150" height="40" rx="4" fill="hsl(var(--primary))"/>
      
      {/* New Detective Icon */}
      <g transform="translate(4, -1) scale(0.9)">
        <circle cx="24" cy="24" r="22" fill="hsl(var(--accent))" />
        <path 
          d="M24,7 C18,7 14,11 14,16 L34,16 C34,11 30,7 24,7 Z
             M12,17 L36,17 L35,19 L13,19 Z
             M15,20 L33,20 L33,35 C33,35 31,28 24,28 C17,28 15,35 15,35 L15,20 Z
             M21.5,21.5 L23,20 L24,21.5 Z
             M25,21.5 L26,20 L27.5,21.5 Z
            "
          fill="hsl(var(--primary-foreground))"
          fillRule="evenodd"
        />
        <circle cx="34" cy="34" r="6" stroke="hsl(var(--primary-foreground))" strokeWidth="2.5" fill="hsl(var(--background))" />
        <line x1="38" y1="38" x2="42" y2="42" stroke="hsl(var(--primary-foreground))" strokeWidth="3" />
      </g>
      
      <text
        x={textX}
        y={textY}
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
      >
        LP Vision
      </text>
    </svg>
  );
}
