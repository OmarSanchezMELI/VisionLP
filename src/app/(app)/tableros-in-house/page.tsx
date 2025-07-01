
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database } from 'lucide-react';

const reports = [
  {
    name: 'Pending Lost y CPP Diario',
    url: 'https://lookerstudio.google.com/embed/reporting/1617a6b6-a970-4c95-9f94-a31ce5572650/page/p_b8uk65ngmd',
  },
  {
    name: 'CPP Acumulado',
    url: 'https://lookerstudio.google.com/embed/reporting/ccd57658-2574-4686-9b3d-2ae8d391771d/page/p_1ihl3oj2md',
  },
  {
    name: 'Pending por Pasillo y Usuario',
    url: 'https://lookerstudio.google.com/embed/reporting/55d196da-4da6-4344-b6c0-32ddd7147e12/page/tEnnC',
  },
];

export default function TablerosInHousePage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Database className="mr-2 h-6 w-6 text-primary" />
          Tableros In House
        </CardTitle>
        <CardDescription>
          Visualización de reportes internos de Looker Studio.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-4">
          Selecciona una pestaña para visualizar el reporte. La carga inicial puede tardar unos segundos.
        </p>
        <Tabs defaultValue={reports[0].name} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
            {reports.map((report) => (
              <TabsTrigger key={report.name} value={report.name} className="py-2">
                {report.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {reports.map((report) => (
            <TabsContent key={report.name} value={report.name} className="mt-4">
              <div className="h-[600px] md:h-auto md:aspect-[16/9] w-full rounded-lg overflow-hidden border">
                <iframe
                  title={report.name}
                  width="100%"
                  height="100%"
                  src={report.url}
                  allowFullScreen
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
                  className="border-0"
                ></iframe>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
