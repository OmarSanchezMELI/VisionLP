"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileSearch, Users, BarChart3 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TeamMember {
  usuario: string;
  role: string;
  photoUrl: string;
  chatUrl: string;
}

const leader: TeamMember = {
  usuario: 'Omar García',
  role: 'Supervisor de Investigaciones',
  photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Garcia.jpeg',
  chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE',
};

const teamMembers: TeamMember[] = [
  {
    usuario: 'Omar Sánchez',
    role: 'Analista Sr BI',
    photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Sanchez.jpeg',
    chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE',
  },
  {
    usuario: 'Daniel Mejía',
    role: 'Analista Jr. de Investigaciones',
    photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Daniel%20Mejia.webp',
    chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5wnHL8AAAAE',
  },
];

const reports = [
  {
    name: 'Tactic',
    url: 'https://lookerstudio.google.com/embed/reporting/29ec7fbe-f97b-40cf-b8e3-ff9c026dceb8/page/seJOF',
  },
  {
    name: 'MDPs',
    url: 'https://lookerstudio.google.com/embed/reporting/9a969c88-8bcf-4d68-8f64-5756cee86b46/page/p_e10pr1dhqd',
  }
];

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function InvestigacionesPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <FileSearch className="mr-2 h-6 w-6 text-primary" />
          Investigaciones
        </CardTitle>
        <CardDescription>Equipo de Investigaciones, Análisis de Datos y Tableros.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-8">
        {/* Leader Section */}
        <div className="pt-4">
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
        </div>

        {/* Team Members Section */}
        <div>
            <h3 className="text-lg font-semibold flex items-center mb-4">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Equipo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <Card key={member.usuario} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex items-center space-x-4">
                            <Link href={member.chatUrl} target="_blank" rel="noopener noreferrer">
                                <Avatar className="h-16 w-16 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                                    <AvatarImage src={member.photoUrl} alt={member.usuario} />
                                    <AvatarFallback>{getInitials(member.usuario)}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <p className="font-bold text-base">{member.usuario}</p>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        
        {/* Dashboards Section */}
        <div>
          <h3 className="text-lg font-semibold flex items-center mb-2">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Tableros de Investigación
          </h3>
           <p className="text-sm text-muted-foreground mb-4">
            Selecciona una pestaña para visualizar el reporte. La carga inicial puede tardar unos segundos.
          </p>
          <Tabs defaultValue={reports[0].name} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
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
        </div>
      </CardContent>
    </Card>
  );
}
