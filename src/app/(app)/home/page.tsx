
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const lookerStudioDirectUrl = "https://lookerstudio.google.com/reporting/2a1228bc-36fb-4f28-8190-38a5149ee670";
  // Updated embed URL based on user input
  const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/2a1228bc-36fb-4f28-8190-38a5149ee670/page/p_t5v3dj3pnd";


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
          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md text-sm" role="alert">
            <div className="flex">
              <div className="py-1"><AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 shrink-0" /></div>
              <div>
                <p className="font-bold">Importante: Problema al mostrar el informe de Looker Studio</p>
                <p className="mt-1">
                  Si ves un mensaje como "No se puede acceder al informe" o "El propietario del informe ha inhabilitado la visualización en otros sitios web", esto indica que <strong>la configuración actual del informe en Looker Studio no permite insertarlo aquí.</strong>
                </p>
                <p className="mt-3">
                  <strong>Para solucionarlo, el propietario del informe debe:</strong>
                </p>
                <ol className="list-decimal list-inside ml-4 mt-1 space-y-1">
                  <li>Abrir el informe directamente en <a href={lookerStudioDirectUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-800">Looker Studio</a>.</li>
                  <li>Ir a "Archivo" (o "File") en el menú superior.</li>
                  <li>Seleccionar "Insertar informe" (o "Embed report").</li>
                  <li>En la ventana emergente, asegurarse de que la casilla <strong>"Habilitar inserción"</strong> (o "Enable embedding") esté marcada.</li>
                  <li>Copiar la "URL para insertar" (Embed URL) proporcionada y verificar que sea la que se está usando en la aplicación (debería ser: <code>{lookerStudioEmbedUrl}</code>).</li>
                  <li>Revisar también las opciones de "Compartir" (Share) para asegurar que los usuarios de esta aplicación tengan permiso para ver el informe (ej. "Cualquier persona en Internet con el enlace puede ver").</li>
                </ol>
                <p className="mt-3">
                  Mientras tanto, puedes intentar abrir el informe directamente usando el botón de abajo. Asegúrate también de haber iniciado sesión en la cuenta de Google correcta que tiene acceso al informe.
                </p>
              </div>
            </div>
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
