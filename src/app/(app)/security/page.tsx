"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, Users, BarChart3 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

interface TeamMember {
  usuario: string;
  email?: string;
  role: string;
  photoUrl?: string;
  chatUrl: string;
}

const leader: TeamMember = {
  usuario: 'Néstor Becerril',
  role: 'Coordinador de Security',
  photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Nestor%20Becerril.jpeg',
  chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/yd_Fb8AAAAE',
  email: 'nestor.becerril@mercadolibre.com.mx'
};

const analysts: TeamMember[] = [
  { usuario: 'Valeria Sánchez', email: 'valeria.sanchez@mercadolibre.com.mx', role: 'Analista de Security', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jY7ekCAAAAE' },
  { usuario: 'Samantha Aldape', email: 'samantha.aldape@mercadolibre.com.mx', role: 'Analista de Security', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/tNS-kCAAAAE' },
  { usuario: 'Alberto Alviter', email: 'alberto.alviter@mercadolibre.com.mx', role: 'Analista de Security', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9FrMb8AAAAE' },
  { usuario: 'Francisco Tribouillier', email: 'francisco.tribouillier@mercadolibre.com.mx', role: 'Analista de Security', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/gp8ekCAAAAE' },
  { usuario: 'José Luis del Castillo', email: 'jose.delcastillo@mercadolibre.com.mx', role: 'Analista de Security', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jose-luis-chat-url' },
];

const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/65ae4cef-0686-43c3-9263-fc9dcbb77a70/page/JHdOF";

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function SecurityPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Lock className="mr-2 h-6 w-6 text-primary" />
          Security
        </CardTitle>
        <CardDescription>Equipo de Security, Análisis y Tablero de Control.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <div className="space-y-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Leader Section */}
            <div className="flex items-center space-x-4">
              <Link href={leader.chatUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={leader.photoUrl} alt={`Foto de ${leader.usuario}`} />
                  <AvatarFallback>{getInitials(leader.usuario)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h3 className="text-xl font-bold">{leader.usuario}</h3>
                <p className="text-md text-muted-foreground">{leader.role}</p>
              </div>
            </div>

            {/* Analysts Card */}
            <Card className="shadow-lg h-full">
                <CardHeader className="p-3">
                    <CardTitle className="text-sm font-headline flex items-center">
                    <Users className="mr-2 h-4 w-4 text-primary" />
                    Analistas de Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <ul className="space-y-2">
                    {analysts.map((member) => (
                        <li key={member.usuario} className="flex items-center space-x-2">
                        <Link href={member.chatUrl} target="_blank" rel="noopener noreferrer">
                            <Avatar className="h-8 w-8 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage src={member.photoUrl || (member.email ? `https://avatar.vercel.sh/${member.email}.png?s=100` : undefined)} alt={member.usuario} />
                            <AvatarFallback>{getInitials(member.usuario)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div>
                            <p className="font-semibold text-xs">{member.usuario}</p>
                        </div>
                        </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
          
          {/* Dashboard Section */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-2">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Tablero de Security
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Visualización de datos clave del equipo de Security.
            </p>
            <div className="h-[600px] md:h-auto md:aspect-[16/9] w-full rounded-lg overflow-hidden border">
                <iframe
                    title="Tablero de Security"
                    width="100%"
                    height="100%"
                    src={lookerStudioEmbedUrl}
                    allowFullScreen
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"
                    className="border-0"
                ></iframe>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
