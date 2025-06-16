
import type { SVGProps } from 'react';

export function MercadoLibreLogo(props: SVGProps<SVGSVGElement>) {
  // Icon properties
  const iconCenterX = 26; // Center X for the icon group
  const iconCenterY = 20; // Center Y for the icon group
  const iconRadius = 11;  // Radius of the background accent circle

  // Text properties
  // Icon right edge is iconCenterX + iconRadius = 26 + 11 = 37.
  // Remaining space for text: 150 - 37 = 113.
  // Midpoint of remaining space for text center: 37 + 113/2 = 37 + 56.5 = 93.5
  const textX = 94; 
  const textY = "50%";

  return (
    <svg viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg" {...props} aria-label="LP Vision Logo">
      {/* Background rectangle of the whole logo */}
      <rect width="150" height="40" rx="4" fill="hsl(var(--primary))"/>

      {/* Detective Icon */}
      <g>
        {/* Background Accent Circle for the icon */}
        <circle cx={iconCenterX} cy={iconCenterY} r={iconRadius} fill="hsl(var(--accent))" />

        {/* Detective Silhouette Elements (fill with primary-foreground) */}
        {/* Fedora Hat Crown */}
        <path d={`M${iconCenterX-4},${iconCenterY-6} C${iconCenterX-4},${iconCenterY-8.5} ${iconCenterX-2.5},${iconCenterY-9} ${iconCenterX},${iconCenterY-9} C${iconCenterX+2.5},${iconCenterY-9} ${iconCenterX+4},${iconCenterY-8.5} ${iconCenterX+4},${iconCenterY-6} Z`} fill="hsl(var(--primary-foreground))" />
        {/* Fedora Hat Brim */}
        <path d={`M${iconCenterX-7},${iconCenterY-6} L${iconCenterX+7},${iconCenterY-6} L${iconCenterX+6},${iconCenterY-4} L${iconCenterX-6},${iconCenterY-4} Z`} fill="hsl(var(--primary-foreground))" />
        
        {/* Body/Coat (simplified trench coat shape) */}
        <path d={`M${iconCenterX-6},${iconCenterY-4.5} L${iconCenterX+6},${iconCenterY-4.5} L${iconCenterX+4},${iconCenterY+5.5} L${iconCenterX-2.5},${iconCenterY+4} L${iconCenterX-4.5},${iconCenterY+1} Z`} fill="hsl(var(--primary-foreground))" />

        {/* Magnifying Glass */}
        {/* Lens - position slightly lower right of silhouette */}
        <circle cx={iconCenterX+4.5} cy={iconCenterY+5} r="3" stroke="hsl(var(--primary-foreground))" strokeWidth="1.2" fill="hsl(var(--background))" />
        {/* Handle */}
        <line x1={iconCenterX+6.8} y1={iconCenterY+7.3} x2={iconCenterX+9} y2={iconCenterY+9.5} stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />
      </g>

      {/* Text "LP Vision" */}
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
