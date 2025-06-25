
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

export default function ControlDePerdidasPage() {
  const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/2a1228bc-36fb-4f28-8190-38a5149ee670/page/p_t5v3dj3pnd";
  const chatUrl = "https://mail.google.com/chat/u/0/#chat/dm/00i2ncAAAAE";
  const imageUrl = "https://lh3.googleusercontent.com/a-/ALV-UjW2KHH26Xf-ouY0wtc2rkXunbgvjlqFaJRTt4x2GpMNiAtMkuPLx1OWuMoe_nCEyahd8YOyqNK1rWC5YCZ1tulhmrnk8Tpju5AgQoXyQEP7EvShPq9pIdYrVbSQU29NwlZgqS6VbYdTnGFv7UG3prhJRYiJVZM3DbwVY97k6oKgKjAe9UbZv4REmBWXNeYrdA7JsJH4zu4U47WDD0BUYEhKk5h4bvqngSOEPtJj_nvL3ToCOKN88jRbSscBpwrayafgi2SGFftfW3xro01vs0kbOx4QrlyeujhOFhtSCfsHa7wJP2isKod-J8SU3sdcDkSTbZTZ1ohC46sVAwIxYOoISzBeVKPNRGNRO89GGRvZS8g10GfuE8eBRj2vEGX66hAQST_JZVu0pDaRzC2nKeKA3g8t2V4Ib9BRZ46GbJK8tXGG-3b_Ibmmgra2SyZCzh_jou3jbAJ0c1Sm32Fmi3ttsuoXab5P665F8qTRVdqOivBPbxAa6CUm-DJLOO6w9VsxN6iG55xAWGmZWvxcz1pcBtBCWVucXanRSRTFaRhcPpBrMougQpgguacwk0Pg0usjfQ-W3-nXEV4gNdAaOZSyj6jV2aL-J_mAwXRKvjtaKJP8gy9MPpUlyCeKdhtzfzpxBpnxyp4CZrQKBEcyXnUBiUbxUaNFwAaH_MHO1sB3nCQSvS9jjXA3htDPMZAQnK5J_zOBIUap3oTZL51nu3MGKlIuN_5uAZpzPPgOpbReICq-h7sdea_RBvmuBHmWwmy1iFiKqxrr2M8Gp50QH_RrCp2wUtuGYIl1er7fz9tY19dPJeqKmxqmMFmqAFp07HPk21c9tRNr8pvyhPPOyLnpvFvitxU7u5ZyAc6VsK6l4F46V88HU5aVX8XIdT6vLhvMudc1UyuACeWaKZWJkML_SRfg40IJY7kmWq0nGJ5WTyXp5KLl0PJJgIz4FKhXC3_uKHIc2slakfstTNmGJBdBTZqrF9Q83A=s272-p-k-rw-no";

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
                <AvatarImage src={imageUrl} alt="Foto de Didier Tolentino" />
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
