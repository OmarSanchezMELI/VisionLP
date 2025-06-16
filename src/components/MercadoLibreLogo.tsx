
import type { SVGProps } from 'react';

export function MercadoLibreLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg" {...props} aria-label="Mercado Libre Logo">
      <rect width="150" height="40" rx="4" fill="hsl(var(--primary))"/>
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="Inter, sans-serif" 
        fontSize="16" 
        fontWeight="bold" 
        fill="hsl(var(--primary-foreground))"
      >
        LP Vision
      </text>
      {/* Simple handshake icon representation */}
      <path d="M20 12 C 18 12, 16 14, 16 16 S 18 20, 20 20 C 22 20, 24 18, 24 16 S 22 12, 20 12 M20 13 A 3 3 0 0 1 23 16 A 3 3 0 0 1 20 19 M20 19 C 18 19, 17 18, 17 17" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" />
      <path d="M20 20 C 18 20, 16 22, 16 24 S 18 28, 20 28 C 22 28, 24 26, 24 24 S 22 20, 20 20 M20 21 A 3 3 0 0 0 17 24 A 3 3 0 0 0 20 27 M20 27 C 22 27, 23 26, 23 25" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" transform="rotate(90 20 24) translate(0, -8)"/>
    </svg>
  );
}
