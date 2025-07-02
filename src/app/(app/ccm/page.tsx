
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

// This page is intentionally left as a placeholder to resolve a persistent routing error.
// Its content helps stabilize the build process.

export default function CcmPlaceholderPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Construction className="mr-2 h-6 w-6 text-primary" />
          Página de CCM no activa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Esta sección se encuentra temporalmente en mantenimiento.</p>
      </CardContent>
    </Card>
  );
}
