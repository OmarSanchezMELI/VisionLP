
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function SecurityPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center">
          <Construction className="mr-2 h-6 w-6 text-primary" />
          Security
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Esta página está en construcción. Vuelve más tarde para ver el contenido de Security.</p>
        <div className="mt-8 flex justify-center">
          <img data-ai-hint="security technology" src="https://placehold.co/600x400.png" alt="Placeholder image for Security" className="rounded-lg shadow-md" />
        </div>
      </CardContent>
    </Card>
  );
}
