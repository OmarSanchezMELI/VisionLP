
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const lookerStudioDirectUrl = "https://lookerstudio.google.com/reporting/29ec7fbe-f97b-40cf-b8e3-ff9c026dceb8";
  // Updated embed URL based on user input
  const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/29ec7fbe-f97b-40cf-b8e3-ff9c026dceb8/page/seJOF";


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl font-headline">Tablero Principal</CardTitle>
          <CardDescription>Visualización de datos clave de Loss Prevention.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <div className="h-[450px] md:h-auto md:aspect-[16/9] w-full rounded-lg overflow-hidden border border-muted bg-muted/10 flex flex-col items-center justify-center">
            <iframe
              title="Looker Studio Report"
              width="100%"
              height="100%"
              src={lookerStudioEmbedUrl} // Using the updated embed URL
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox" // Updated sandbox attributes
              className="border-0"
            ></iframe>
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href={lookerStudioDirectUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" />
                Abrir informe en Looker Studio
              </Link>
            </Button>
             <p className="text-xs text-muted-foreground mt-2">
                (Se abrirá en una nueva pestaña del navegador)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
