import Image from 'next/image';
import type { HTMLAttributes } from 'react';

// This URL points to the exact logo image you provided.
const logoUrl = "https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Vision%20Logo.png"; 

export function MercadoLibreLogo(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      src={logoUrl}
      alt="LP Vision Logo"
      width={160}
      height={40}
      priority
      {...props}
    />
  );
}
