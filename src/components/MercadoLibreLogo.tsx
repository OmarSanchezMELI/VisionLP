import Image from 'next/image';
import type { HTMLAttributes } from 'react';

// This URL points to the exact logo image you provided, hosted on Imgur.
const logoUrl = "https://i.imgur.com/uG5AW9b.png"; 

export function MercadoLibreLogo(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      src={logoUrl}
      alt="LP Vision Logo"
      width={143}
      height={40}
      priority
      {...props}
    />
  );
}
