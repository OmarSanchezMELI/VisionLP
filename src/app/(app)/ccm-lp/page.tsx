
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Video, Users, UserCheck, User, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

// --- Helper Functions and Data ---

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const ccmLeader = {
  usuario: 'Alejandra Lucero',
  email: 'alejandra.lucero@mercadolibre.com.mx',
  role: 'Líder de CCM',
  chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/G-pCYCAAAAE',
};

const ccmAnalysts = [
  { usuario: 'Michelle Toscano', email: 'michelle.toscano@mercadolibre.com.mx', horario: '09:00-18:00', diasNoDisponibles: ['sabado', 'domingo'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/elDPYCAAAAE' },
];

const ccmMonitors = [
    { usuario: 'YANG MADGIEL CASTRO ZANABRIA', email: 'yang.castro@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/W1jUYCAAAAE' },
    { usuario: 'MARIA GUADALUPE CHAVEZ MORALES', email: 'maria.chavez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/G8bRYCAAAAE' },
    { usuario: 'JORGE ALBERTO CHABLE RAMIREZ', email: 'jorge.chable@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5f3QYCAAAAE' },
    { usuario: 'SAMANTHA ECHEVERRIA ROQUE', email: 'samantha.echeverria@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/nwvQYCAAAAE' },
    { usuario: 'JUAN REVILLA TORRES', email: 'juan.revilla@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/xALQYCAAAAE' },
    { usuario: 'ERICK ULLOA', email: 'erick.ulloa@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/PgnQYCAAAAE' },
    { usuario: 'ROBERTO CARLOS RODRIGUEZ VEGA', email: 'roberto.rodriguez@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/UfTPYCAAAAE' },
    { usuario: 'RICARDO JAVIER SOLORIO MARTINEZ', email: 'ricardo.solorio@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/isaac-hernandez-chat-url' },
];

const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/8364d081-338c-4853-9372-f155913e659b/page/p_h1r6z5g1qd";

// --- Dynamic Team Components ---

function TeamOnDuty({ title, teamData, icon }: { title: string, teamData: typeof ccmAnalysts, icon: React.ReactNode }) {
  const [onDuty, setOnDuty] = useState<(typeof teamData)>([]);

  const checkSchedules = useCallback(() => {
    const now = new Date();
    const dayOfWeek = new Intl.DateTimeFormat('es-MX', { weekday: 'long', timeZone: 'America/Mexico_City' }).format(now).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const currentTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City', hour12: false }).format(now);

    const available = teamData.filter(member => {
      if (member.diasNoDisponibles.includes(dayOfWeek)) return false;
      
      const [startTime, endTime] = member.horario.split('-');
      
      // Handle overnight shifts
      if (startTime > endTime) {
        return currentTime >= startTime || currentTime <= endTime;
      }
      
      // Handle day shifts
      return currentTime >= startTime && currentTime <= endTime;
    });
    setOnDuty(available);
  }, [teamData]);

  useEffect(() => {
    checkSchedules();
    const intervalId = setInterval(checkSchedules, 1200000); // Update every 20 minutes
    return () => clearInterval(intervalId);
  }, [checkSchedules]);

  return (
    <Card className="shadow-lg h-full">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-headline flex items-center">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {onDuty.length > 0 ? (
          <ul className="space-y-2">
            {onDuty.map((member) => (
              <li key={member.usuario} className="flex items-center space-x-2">
                <Link href={member.chatUrl} target="_blank" rel="noopener noreferrer">
                  <Avatar className="h-8 w-8 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={member.email ? `https://avatar.vercel.sh/${member.email}.png?s=100` : undefined} alt={member.usuario} />
                    <AvatarFallback>{getInitials(member.usuario)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <p className="font-semibold text-xs">{member.usuario}</p>
                  <p className="text-xs text-muted-foreground">{member.horario}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center py-2 text-sm">
            No hay personal disponible.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// --- Main Page Component ---

export default function CcmLpPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Video className="mr-2 h-6 w-6 text-primary" />
          CCM
        </CardTitle>
        <CardDescription>Herramientas y personal del equipo de CCM.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <div className="space-y-8 pt-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Leader Card */}
            <div className="md:col-span-1">
                <Card className="shadow-lg h-full">
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm font-headline flex items-center">
                            <User className="mr-2 h-4 w-4 text-primary" />
                            Líder de Equipo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 flex flex-col items-center text-center">
                         <Link href={ccmLeader.chatUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                            <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity mb-2">
                                <AvatarImage src={ccmLeader.email ? `https://avatar.vercel.sh/${ccmLeader.email}.png?s=100` : undefined} alt={`Foto de ${ccmLeader.usuario}`} />
                                <AvatarFallback>{getInitials(ccmLeader.usuario)}</AvatarFallback>
                            </Avatar>
                         </Link>
                        <h3 className="text-lg font-bold">{ccmLeader.usuario}</h3>
                        <p className="text-md text-muted-foreground">{ccmLeader.role}</p>
                    </CardContent>
                </Card>
            </div>

            {/* On-Duty Cards */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TeamOnDuty 
                    title="Analistas en Turno" 
                    teamData={ccmAnalysts} 
                    icon={<UserCheck className="mr-2 h-4 w-4 text-primary" />} 
                />
                <TeamOnDuty 
                    title="Monitoristas en Turno" 
                    teamData={ccmMonitors} 
                    icon={<Users className="mr-2 h-4 w-4 text-primary" />} 
                />
            </div>
          </div>
          
          {/* Looker Studio Dashboard */}
           <div>
                <h3 className="text-lg font-semibold flex items-center mb-2">
                    <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                    Tablero de Control CCM
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Visualización de datos clave del Centro de Control y Monitoreo.
                </p>
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
           </div>

        </div>
      </CardContent>
    </Card>
  );
}
