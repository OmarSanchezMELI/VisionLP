
"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { MercadoLibreLogo } from '@/components/MercadoLibreLogo';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error de Validación",
        description: "Por favor, ingresa tu correo electrónico.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const success = await login(email);
    if (!success) {
      toast({
        title: "Acceso Denegado",
        description: "El correo electrónico no está autorizado o no es válido.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-yellow-100 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="items-center text-center p-4 md:p-6">
          <MercadoLibreLogo className="h-12 w-auto mb-4" />
          <CardTitle className="text-2xl md:text-3xl font-headline">LP Vision</CardTitle>
          <CardDescription>Bienvenido. Inicia sesión para continuar.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu.correo@mercadolibre.com.mx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base"
                aria-describedby="email-description"
              />
              <p id="email-description" className="text-xs text-muted-foreground">
                Usa tu correo electrónico de Mercado Libre.
              </p>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base py-3" disabled={authLoading || isSubmitting}>
              {authLoading || isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              )}
              Iniciar Sesión con Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground p-4 md:p-6">
          <p>&copy; {new Date().getFullYear()} Mercado Libre. Todos los derechos reservados.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
