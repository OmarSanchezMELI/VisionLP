
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BotIcon, BarChart3 } from 'lucide-react';

const reportes = [
  {
    name: 'FPP Steerco',
    url: 'https://tableau.adminml.com/t/Shipping/views/TableroSteercoEstimado/FPPNegocio?:embed=y&:showVizHome=n&:tabs=n&:toolbar=n',
  },
  {
    name: 'Pending Lost',
    url: 'https://tableau.adminml.com/t/Shipping/views/PendingLost/PendingLost?:embed=y&:showVizHome=n&:tabs=n&:toolbar=n',
  },
  {
    name: 'Pending Damaged',
    url: 'https://tableau.adminml.com/t/Shipping/views/Pendingdamagebq/PendingDamagedDr?:embed=y&:showVizHome=n&:tabs=n&:toolbar=n',
  },
  {
    name: 'Pagos Manuales',
    url: 'https://tableau.adminml.com/t/Shipping/views/Ticketsmanualpay_16571470893210/Generalestotaldetickets?:embed=y&:showVizHome=n&:tabs=n&:toolbar=n',
  },
];

const BrowserFrame = ({ src, title }: { src: string; title: string }) => (
  <div className="rounded-lg border bg-card shadow-sm overflow-hidden w-full">
    <div className="h-11 flex items-center px-4 bg-muted border-b gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <span className="h-3 w-3 bg-red-500 rounded-full" />
        <span className="h-3 w-3 bg-yellow-400 rounded-full" />
        <span className="h-3 w-3 bg-green-500 rounded-full" />
      </div>
      <div className="flex-1 bg-background rounded-full h-7 flex items-center px-4 text-xs text-muted-foreground truncate">
        {src}
      </div>
    </div>
    <div className="h-[600px] md:h-auto md:aspect-[16/9] bg-background">
      <iframe
        title={title}
        width="100%"
        height="100%"
        src={src}
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
        className="border-0"
      ></iframe>
    </div>
  </div>
);

export default function BOTPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <BotIcon className="mr-2 h-6 w-6 text-primary" />
          BOT
        </CardTitle>
        <CardDescription>
          Automatización y visualización de reportes regionales de Tableau.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center mb-2">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Tableros Regionales
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Selecciona una pestaña para visualizar el reporte. La carga inicial puede tardar unos segundos.
          </p>
          <Tabs defaultValue={reportes[0].name} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              {reportes.map((reporte) => (
                <TabsTrigger key={reporte.name} value={reporte.name} className="py-2">
                  {reporte.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {reportes.map((reporte) => (
              <TabsContent key={reporte.name} value={reporte.name} className="mt-4">
                <BrowserFrame src={reporte.url} title={reporte.name} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
