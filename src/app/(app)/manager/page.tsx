
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function ManagerPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Construction className="mr-2 h-6 w-6 text-primary" />
          Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Esta página está en construcción. Vuelve más tarde para ver el contenido de Manager.</p>
        <div className="mt-8 flex justify-center">
          <img data-ai-hint="management dashboard" src="https://placehold.co/600x400.png" alt="Placeholder image for Manager" className="w-full h-auto max-w-lg rounded-lg shadow-md" />
        </div>
      </CardContent>
    </Card>
  );
}
