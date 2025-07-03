
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ShieldAlert, FileSearch, Video, Lock } from 'lucide-react';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay"

// --- Data Consolidation ---

// Leader data
const leaders = [
  {
    id: 'cp',
    usuario: 'Didier Tolentino',
    role: 'Coordinador de CP',
    icon: ShieldAlert,
    photoUrl: "https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/unnamed.webp",
    chatUrl: "https://mail.google.com/chat/u/0/#chat/dm/00i2ncAAAAE"
  },
  {
    id: 'investigaciones',
    usuario: 'Omar García',
    role: 'Supervisor de Investigaciones',
    icon: FileSearch,
    photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Garcia.jpeg',
    chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE',
  },
  {
    id: 'ccm',
    usuario: 'Alejandra Lucero',
    role: 'Líder de CCM',
    icon: Video,
    photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Alejandra%20Lucero.jpeg',
    chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/G-pCYCAAAAE',
  },
  {
    id: 'security',
    usuario: 'Néstor Becerril',
    role: 'Coordinador de Security',
    icon: Lock,
    photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Nestor%20Becerril.jpeg',
    chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/yd_Fb8AAAAE',
    email: 'nestor.becerril@mercadolibre.com.mx'
  }
];

// Team data
const teams = {
  cp: [
    { usuario: 'Andrés Navarrete', email: 'andres.navarreteleon@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/-fzFYCAAAAE' },
    { usuario: 'Keyla Barbosa', email: 'keylaabril.barbosagonzalez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9n-1YCAAAAE' },
    { usuario: 'Jorge Sotero', email: 'jorge.sotero@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/zMHVYCAAAAE' },
    { usuario: 'Esperanza Sánchez', email: 'esperanza.sanchez@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/mgK5YCAAAAE' },
    { usuario: 'Salvador Bautista', email: 'salvador.bautista@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/ug2NYCAAAAE' },
  ],
  investigaciones: [
    { usuario: 'Omar Sánchez', email: 'omar.sanchezfigueroa@mercadolibre.com.mx', role: 'Analista Sr BI', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Sanchez.jpeg', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE' },
    { usuario: 'Daniel Mejía', email: 'daniel.mejiaibarra@mercadolibre.com.mx', role: 'Analista Jr. de Investigaciones', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Daniel%20Mejia.webp', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5wnHL8AAAAE' },
  ],
  ccm: [
    { usuario: 'Michelle Toscano', email: 'michelle.toscano@mercadolibre.com.mx', horario: '09:00-18:00', diasNoDisponibles: ['sabado', 'domingo'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/elDPYCAAAAE' },
    { usuario: 'Yang Madgiel Castro Zanabria', email: 'yang.castro@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/W1jUYCAAAAE' },
    { usuario: 'Maria Guadalupe Chavez Morales', email: 'maria.chavez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/G8bRYCAAAAE' },
    { usuario: 'Jorge Alberto Chable Ramirez', email: 'jorge.chable@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5f3QYCAAAAE' },
    { usuario: 'Samantha Echeverria Roque', email: 'samantha.echeverria@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/nwvQYCAAAAE' },
    { usuario: 'Juan Revilla Torres', email: 'juan.revilla@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/xALQYCAAAAE' },
    { usuario: 'Erick Ulloa', email: 'erick.ulloa@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/PgnQYCAAAAE' },
    { usuario: 'Roberto Carlos Rodriguez Vega', email: 'roberto.rodriguez@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/UfTPYCAAAAE' },
    { usuario: 'Ricardo Javier Solorio Martinez', email: 'ricardo.solorio@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/isaac-hernandez-chat-url' },
  ],
  security: [
    { usuario: 'Valeria Sánchez', email: 'valeria.sanchez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jY7ekCAAAAE' },
    { usuario: 'Francisco Tribouillier', email: 'francisco.tribouillier@mercadolibre.com.mx', horario: '12:00-21:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/gp8ekCAAAAE' },
    { usuario: 'Alberto Alviter', email: 'alberto.alviter@mercadolibre.com.mx', horario: '20:30-06:00', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9FrMb8AAAAE' },
    { usuario: 'Samantha Aldape', email: 'samantha.aldape@mercadolibre.com.mx', horario: '20:30-06:30', diasNoDisponibles: ['domingo', 'lunes', 'martes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/tNS-kCAAAAE' },
    { usuario: 'Luis Daniel Del Castillo', email: 'jose.delcastillo@mercadolibre.com.mx', horario: '08:00-17:30', diasNoDisponibles: ['sabado', 'domingo'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jose-luis-chat-url' },
  ],
};

// --- Helper Functions ---
const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// --- Sub-components ---
function TeamCard({ leader, team }: { leader: typeof leaders[0], team: any[] }) {
  const [onDuty, setOnDuty] = useState<any[]>([]);

  const checkSchedules = useCallback(() => {
    // Investigations team has no schedule, so they are always "on duty"
    if (leader.id === 'investigaciones') {
      setOnDuty(team);
      return;
    }

    const now = new Date();
    const dayOfWeek = new Intl.DateTimeFormat('es-MX', { weekday: 'long', timeZone: 'America/Mexico_City' }).format(now).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const currentTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City', hour12: false }).format(now);

    const available = team.filter(member => {
      if (!('horario' in member) || !member.horario) return false;
      if (member.diasNoDisponibles.includes(dayOfWeek)) return false;

      const [startTime, endTime] = member.horario.split('-');
      if (startTime > endTime) { // Overnight shift
        return currentTime >= startTime || currentTime <= endTime;
      }
      return currentTime >= startTime && currentTime <= endTime; // Day shift
    });

    setOnDuty(available);
  }, [team, leader.id]);

  useEffect(() => {
    checkSchedules();
    const intervalId = setInterval(checkSchedules, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [checkSchedules]);

  const LeaderIcon = leader.icon;

  return (
    <Card className="flex flex-col h-[300px] w-full max-w-sm mx-auto shadow-lg">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-4">
          <Link href={leader.chatUrl} target="_blank" rel="noopener noreferrer">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={leader.photoUrl || (leader.email ? `https://avatar.vercel.sh/${leader.email}.png?s=100` : undefined)} alt={leader.usuario} />
              <AvatarFallback>{getInitials(leader.usuario)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 overflow-hidden">
            <CardTitle className="text-lg font-bold truncate">{leader.usuario}</CardTitle>
            <CardDescription className="flex items-center text-sm text-lp-blue">
                <LeaderIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{leader.role}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow overflow-y-auto">
        <div className="space-y-3">
          {onDuty.length > 0 ? (
            onDuty.map((member) => (
              <div key={member.usuario} className="flex items-center space-x-3">
                 <Link href={member.chatUrl} target="_blank" rel="noopener noreferrer">
                    <Avatar className="h-9 w-9 border-2 border-green-500">
                      <AvatarImage src={member.photoUrl || (member.email ? `https://avatar.vercel.sh/${member.email}.png?s=100` : undefined)} alt={member.usuario} />
                      <AvatarFallback>{getInitials(member.usuario)}</AvatarFallback>
                    </Avatar>
                 </Link>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">{member.usuario}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {'horario' in member && member.horario ? member.horario : member.role}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground pt-4">
              <p>No hay personal disponible en este momento.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


// --- Main Page Component ---
export default function InicioPage() {
    const plugin = useRef(
        Autoplay({ delay: 10000, stopOnMouseEnter: true })
    );

  return (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-headline">Equipo en Turno</CardTitle>
            <CardDescription>Desliza para ver el personal disponible en cada área. Cambia automáticamente cada 10 segundos.</CardDescription>
        </CardHeader>
        <CardContent>
            <Carousel
                plugins={[plugin.current]}
                opts={{ align: "start", loop: true }}
                className="w-full"
            >
                <CarouselContent>
                {leaders.map((leader) => (
                    <CarouselItem key={leader.id} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                        <TeamCard leader={leader} team={teams[leader.id as keyof typeof teams]} />
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:inline-flex" />
                <CarouselNext className="hidden sm:inline-flex" />
            </Carousel>
        </CardContent>
    </Card>
  );
}
