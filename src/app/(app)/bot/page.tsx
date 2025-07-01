
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BotIcon, Database, BarChart3 } from 'lucide-react';

const reportesRegionales = [
  {
    name: 'FPP Steerco',
    url: 'https://tableau.adminml.com/t/Shipping/views/TableroSteercoEstimado/FPPNegocio?:embed=y&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
  },
  {
    name: 'Pending Lost',
    url: 'https://tableau.adminml.com/t/Shipping/views/PendingLost/PendingLost?:embed=y&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
  },
  {
    name: 'Pending Damaged',
    url: 'https://tableau.adminml.com/t/Shipping/views/Pendingdamagebq/PendingDamagedDr?:embed=y&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
  },
  {
    name: 'Pagos Manuales',
    url: 'https://tableau.adminml.com/t/Shipping/views/Ticketsmanualpay_16571470893210/Generalestotaldetickets?:embed=y&:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link',
  },
];

const reportesInHouse = [
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

export default function BotPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <BotIcon className="mr-2 h-6 w-6 text-primary" />
          BOT - Automatización y Reportes
        </CardTitle>
        <CardDescription>
          Visualización de reportes regionales de Tableau y tableros internos de Looker Studio.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="regionales" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="regionales">
              <BarChart3 className="mr-2 h-4 w-4" />
              Tableros Regionales
            </TabsTrigger>
            <TabsTrigger value="in-house">
              <Database className="mr-2 h-4 w-4" />
              Tableros In House
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="regionales" className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Selecciona una pestaña para visualizar el reporte de Tableau.
            </p>
            <Tabs defaultValue={reportesRegionales[0].name} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                {reportesRegionales.map((reporte) => (
                  <TabsTrigger key={reporte.name} value={reporte.name} className="py-2">
                    {reporte.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {reportesRegionales.map((reporte) => (
                <TabsContent key={reporte.name} value={reporte.name} className="mt-4">
                  <div className="h-[600px] md:h-auto md:aspect-[16/9] w-full rounded-lg overflow-hidden border">
                      <iframe
                          title={reporte.name}
                          width="100%"
                          height="100%"
                          src={reporte.url}
                          allowFullScreen
                          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
                          className="border-0"
                      ></iframe>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="in-house" className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Selecciona una pestaña para visualizar el reporte de Looker Studio.
            </p>
            <Tabs defaultValue={reportesInHouse[0].name} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
                {reportesInHouse.map((report) => (
                  <TabsTrigger key={report.name} value={report.name} className="py-2">
                    {report.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {reportesInHouse.map((report) => (
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
