
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cctv } from 'lucide-react';

export default function CCMPage() {
  const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/3fe8c1d0-7995-45c8-91b2-0fe6e2e1be76/page/jnuVE";

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Cctv className="mr-2 h-6 w-6 text-primary" />
          CCM
        </CardTitle>
        <CardDescription>Visualización de datos clave para CCM.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
         <div className="h-[450px] md:h-auto md:aspect-[16/9] w-full rounded-lg overflow-hidden border border-muted bg-muted/10 flex flex-col items-center justify-center">
            <iframe
              title="Reporte de CCM"
              width="100%"
              height="100%"
              src={lookerStudioEmbedUrl}
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
              className="border-0"
            ></iframe>
          </div>
      </CardContent>
    </Card>
  );
}
