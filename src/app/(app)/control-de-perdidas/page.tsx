
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

export default function ControlDePerdidasPage() {
  const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/2a1228bc-36fb-4f28-8190-38a5149ee670/page/p_t5v3dj3pnd";
  const chatUrl = "https://chat.google.com/u/0/search/alexis.tolentinorivera@mercadolibre.com.mx";

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <ShieldAlert className="mr-2 h-6 w-6 text-primary" />
          Control de Pérdidas
        </CardTitle>
        <CardDescription>Visualización de datos clave para el Control de Pérdidas.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <div className="space-y-6 pt-4">
          <div className="flex items-center space-x-4">
            <Link href={chatUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src="https://i.imgur.com/eBwF7gC.png" alt="Foto de Didier Tolentino" />
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h3 className="text-xl font-bold">Didier Tolentino</h3>
              <p className="text-md text-muted-foreground">Coordinador de CP</p>
            </div>
          </div>
          <div className="h-[450px] md:h-auto md:aspect-[16/9] w-full rounded-lg overflow-hidden border border-muted bg-muted/10 flex flex-col items-center justify-center">
              <iframe
                title="Reporte de Control de Pérdidas"
                width="100%"
                height="100%"
                src={lookerStudioEmbedUrl}
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
                className="border-0"
              ></iframe>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
