
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function TablerosInHousePage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Construction className="mr-2 h-6 w-6 text-primary" />
          Tableros In House
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Esta página está en construcción. Vuelve más tarde para ver el contenido.</p>
        <div className="mt-8 flex justify-center">
          <img data-ai-hint="in-house dashboard" src="https://placehold.co/600x400.png" alt="Placeholder image for In-House Dashboards" className="w-full h-auto max-w-lg rounded-lg shadow-md" />
        </div>
      </CardContent>
    </Card>
  );
}
