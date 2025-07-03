
"use client";

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, UserCheck, ShieldAlert, Video, Lock, FileSearch } from 'lucide-react';
import Link from 'next/link';

// --- DATA ---

interface TeamMember {
    usuario: string;
    email?: string;
    horario: string;
    diasNoDisponibles: string[];
    chatUrl: string;
    photoUrl?: string;
}

const repsData: TeamMember[] = [
  { usuario: 'Andrés Navarrete', email: 'andres.navarreteleon@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/-fzFYCAAAAE' },
  { usuario: 'Keyla Barbosa', email: 'keylaabril.barbosagonzalez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9n-1YCAAAAE' },
  { usuario: 'Jorge Sotero', email: 'jorge.sotero@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/zMHVYCAAAAE' },
  { usuario: 'Esperanza Sánchez', email: 'esperanza.sanchez@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/mgK5YCAAAAE' },
  { usuario: 'Salvador Bautista', email: 'salvador.bautista@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/ug2NYCAAAAE' },
];

const ccmAnalysts: TeamMember[] = [
  { usuario: 'Michelle Toscano', email: 'michelle.toscano@mercadolibre.com.mx', horario: '09:00-18:00', diasNoDisponibles: ['sabado', 'domingo'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/elDPYCAAAAE' },
];

const ccmMonitors: TeamMember[] = [
    { usuario: 'Yang Madgiel Castro Zanabria', email: 'yang.castro@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/W1jUYCAAAAE' },
    { usuario: 'Maria Guadalupe Chavez Morales', email: 'maria.chavez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/G8bRYCAAAAE' },
    { usuario: 'Jorge Alberto Chable Ramirez', email: 'jorge.chable@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5f3QYCAAAAE' },
    { usuario: 'Samantha Echeverria Roque', email: 'samantha.echeverria@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/nwvQYCAAAAE' },
    { usuario: 'Juan Revilla Torres', email: 'juan.revilla@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/xALQYCAAAAE' },
    { usuario: 'Erick Ulloa', email: 'erick.ulloa@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/PgnQYCAAAAE' },
    { usuario: 'Roberto Carlos Rodriguez Vega', email: 'roberto.rodriguez@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/UfTPYCAAAAE' },
    { usuario: 'Ricardo Javier Solorio Martinez', email: 'ricardo.solorio@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/isaac-hernandez-chat-url' },
];

const securityAnalysts: TeamMember[] = [
  { usuario: 'Valeria Sánchez', email: 'valeria.sanchez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jY7ekCAAAAE' },
  { usuario: 'Francisco Tribouillier', email: 'francisco.tribouillier@mercadolibre.com.mx', horario: '12:00-21:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/gp8ekCAAAAE' },
  { usuario: 'Alberto Alviter', email: 'alberto.alviter@mercadolibre.com.mx', horario: '20:30-06:00', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9FrMb8AAAAE' },
  { usuario: 'Samantha Aldape', email: 'samantha.aldape@mercadolibre.com.mx', horario: '20:30-06:30', diasNoDisponibles: ['domingo', 'lunes', 'martes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/tNS-kCAAAAE' },
  { usuario: 'Luis Daniel Del Castillo', email: 'jose.delcastillo@mercadolibre.com.mx', horario: '08:00-17:30', diasNoDisponibles: ['sabado', 'domingo'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jose-luis-chat-url' },
];

const investigacionesTeam: TeamMember[] = [
  { usuario: 'Omar Sánchez', email: 'omar.sanchezfigueroa@mercadolibre.com.mx', horario: '09:00-18:00', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Sanchez.jpeg' },
  { usuario: 'Daniel Mejía', email: 'daniel.mejiaibarra@mercadolibre.com.mx', horario: '09:00-18:00', diasNoDisponibles: ['sabado', 'domingo'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5wnHL8AAAAE', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Daniel%20Mejia.webp' }
];

const leaders = {
    cp: { name: 'Didier Tolentino', role: 'Coordinador de CP', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/unnamed.webp', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/00i2ncAAAAE', icon: ShieldAlert },
    ccm: { name: 'Alejandra Lucero', role: 'Líder de CCM', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Alejandra%20Lucero.jpeg', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/G-pCYCAAAAE', icon: Video },
    security: { name: 'Néstor Becerril', role: 'Coordinador de Security', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Nestor%20Becerril.jpeg', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/yd_Fb8AAAAE', email: 'nestor.becerril@mercadolibre.com.mx', icon: Lock },
    investigaciones: { name: 'Omar García', role: 'Supervisor de Investigaciones', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Garcia.jpeg', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE', email: 'omar.garciavaldez@mercadolibre.com.mx', icon: FileSearch }
};

// --- HELPERS ---

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};


// --- COMPONENTS ---

function TeamOnDuty({ title, teamData, icon }: { title: string, teamData: TeamMember[], icon: ReactNode }) {
  const [onDuty, setOnDuty] = useState<TeamMember[]>([]);

  const checkSchedules = useCallback(() => {
    const now = new Date();
    const dayOfWeek = new Intl.DateTimeFormat('es-MX', { weekday: 'long', timeZone: 'America/Mexico_City' }).format(now).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const currentTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City', hour12: false }).format(now);

    const available = teamData.filter(member => {
      if (member.diasNoDisponibles.includes(dayOfWeek)) return false;
      const [startTime, endTime] = member.horario.split('-');
      if (startTime > endTime) {
        return currentTime >= startTime || currentTime <= endTime;
      }
      return currentTime >= startTime && currentTime <= endTime;
    });
    setOnDuty(available);
  }, [teamData]);

  useEffect(() => {
    checkSchedules();
    const intervalId = setInterval(checkSchedules, 600000); // Update every 10 minutes
    return () => clearInterval(intervalId);
  }, [checkSchedules]);

  return (
    <div>
        <h4 className="font-semibold text-sm mb-2 flex items-center text-muted-foreground">{icon}{title}</h4>
        {onDuty.length > 0 ? (
          <ul className="space-y-2">
            {onDuty.map((member) => (
              <li key={member.usuario} className="flex items-center space-x-2">
                <Link href={member.chatUrl} target="_blank" rel="noopener noreferrer">
                  <Avatar className="h-9 w-9 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={member.photoUrl || (member.email ? `https://avatar.vercel.sh/${member.email}.png?s=100` : undefined)} alt={member.usuario} />
                    <AvatarFallback>{getInitials(member.usuario)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <p className="font-semibold text-sm">{member.usuario}</p>
                  <p className="text-xs text-muted-foreground">{member.horario}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center py-2 text-sm italic">
            No hay personal disponible.
          </p>
        )}
    </div>
  );
}


export default function HomePage() {
  return (
    <div className="space-y-6">
       <Card className="shadow-lg bg-card/50">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-headline">Resumen de Equipos en Turno</CardTitle>
          <CardDescription>Vista rápida del personal disponible en cada área de Loss Prevention.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Control de Pérdidas */}
        <Card className="shadow-lg flex flex-col">
            <CardHeader className="text-center p-4">
                 <Link href={leaders.cp.chatUrl} target="_blank" rel="noopener noreferrer" className="self-center">
                    <Avatar className="h-20 w-20 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                        <AvatarImage src={leaders.cp.photoUrl} alt={leaders.cp.name} />
                        <AvatarFallback>{getInitials(leaders.cp.name)}</AvatarFallback>
                    </Avatar>
                </Link>
                <CardTitle className="text-lg mt-2">{leaders.cp.name}</CardTitle>
                <CardDescription className="flex items-center justify-center text-primary text-sm">
                    <leaders.cp.icon className="mr-2 h-4 w-4" />
                    {leaders.cp.role}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-2 border-t">
                <TeamOnDuty title="REPs en Turno" teamData={repsData} icon={<Users className="mr-2 h-4 w-4" />} />
            </CardContent>
        </Card>

        {/* CCM */}
        <Card className="shadow-lg flex flex-col">
            <CardHeader className="text-center p-4">
                 <Link href={leaders.ccm.chatUrl} target="_blank" rel="noopener noreferrer" className="self-center">
                    <Avatar className="h-20 w-20 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                        <AvatarImage src={leaders.ccm.photoUrl} alt={leaders.ccm.name} />
                        <AvatarFallback>{getInitials(leaders.ccm.name)}</AvatarFallback>
                    </Avatar>
                </Link>
                <CardTitle className="text-lg mt-2">{leaders.ccm.name}</CardTitle>
                <CardDescription className="flex items-center justify-center text-primary text-sm">
                    <leaders.ccm.icon className="mr-2 h-4 w-4" />
                    {leaders.ccm.role}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-2 border-t space-y-4">
                <TeamOnDuty title="Analistas en Turno" teamData={ccmAnalysts} icon={<UserCheck className="mr-2 h-4 w-4" />} />
                <TeamOnDuty title="Monitoristas en Turno" teamData={ccmMonitors} icon={<Users className="mr-2 h-4 w-4" />} />
            </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-lg flex flex-col">
            <CardHeader className="text-center p-4">
                 <Link href={leaders.security.chatUrl} target="_blank" rel="noopener noreferrer" className="self-center">
                    <Avatar className="h-20 w-20 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                        <AvatarImage src={leaders.security.photoUrl} alt={leaders.security.name} />
                        <AvatarFallback>{getInitials(leaders.security.name)}</AvatarFallback>
                    </Avatar>
                </Link>
                <CardTitle className="text-lg mt-2">{leaders.security.name}</CardTitle>
                <CardDescription className="flex items-center justify-center text-primary text-sm">
                    <leaders.security.icon className="mr-2 h-4 w-4" />
                    {leaders.security.role}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-2 border-t">
                <TeamOnDuty title="Analistas en Turno" teamData={securityAnalysts} icon={<Users className="mr-2 h-4 w-4" />} />
            </CardContent>
        </Card>

        {/* Investigaciones */}
        <Card className="shadow-lg flex flex-col">
            <CardHeader className="text-center p-4">
                 <Link href={leaders.investigaciones.chatUrl} target="_blank" rel="noopener noreferrer" className="self-center">
                    <Avatar className="h-20 w-20 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                        <AvatarImage src={leaders.investigaciones.photoUrl} alt={leaders.investigaciones.name} />
                        <AvatarFallback>{getInitials(leaders.investigaciones.name)}</AvatarFallback>
                    </Avatar>
                </Link>
                <CardTitle className="text-lg mt-2">{leaders.investigaciones.name}</CardTitle>
                <CardDescription className="flex items-center justify-center text-primary text-sm">
                    <leaders.investigaciones.icon className="mr-2 h-4 w-4" />
                    {leaders.investigaciones.role}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-2 border-t">
                <TeamOnDuty title="Equipo de Análisis" teamData={investigacionesTeam} icon={<Users className="mr-2 h-4 w-4" />} />
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
