
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function HomePage() {
  const lookerStudioUrl = "https://lookerstudio.google.com/reporting/2a1228bc-36fb-4f28-8190-38a5149ee670/page/p_t5v3dj3pnd";

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Tablero Principal</CardTitle>
          <CardDescription>Visualización de datos clave de Loss Prevention.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-muted">
            <iframe
              title="Looker Studio Report"
              width="100%"
              height="100%"
              src={lookerStudioUrl}
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups"
              className="border-0"
            ></iframe>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md text-sm" role="alert">
            <div className="flex">
              <div className="py-1"><AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" /></div>
              <div>
                <p className="font-bold">Nota sobre la visualización:</p>
                <p>Asegúrate de haber iniciado sesión en tu cuenta de Google con acceso al informe de Looker Studio para una correcta visualización. Si ves un error, verifica tus permisos o contacta al administrador del informe.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
