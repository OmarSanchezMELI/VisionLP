
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

export default function GestionLpPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <ClipboardList className="mr-2 h-6 w-6 text-primary" />
          Gestión LP
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Esta página está en construcción. Vuelve más tarde para ver el contenido de Gestión LP.</p>
        <div className="mt-8 flex justify-center">
          <img data-ai-hint="management list" src="https://placehold.co/600x400.png" alt="Placeholder image for Gestión LP" className="w-full h-auto max-w-lg rounded-lg shadow-md" />
        </div>
      </CardContent>
    </Card>
  );
}
