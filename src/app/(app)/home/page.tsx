
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
              <li key={member.usuario} className="flex items-center space-x-3">
                <Link href={member.chatUrl} target="_blank" rel="noopener noreferrer">
                  <Avatar className="h-8 w-8 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={member.photoUrl || (member.email ? `https://avatar.vercel.sh/${member.email}.png?s=100` : undefined)} alt={member.usuario} />
                    <AvatarFallback>{getInitials(member.usuario)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <p className="font-semibold text-sm whitespace-nowrap">{member.usuario}</p>
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
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const teamCards = [
    { key: 'cp', leader: leaders.cp, teams: [{ title: "REPs en Turno", data: repsData, icon: <Users className="mr-2 h-4 w-4" /> }] },
    { key: 'ccm', leader: leaders.ccm, teams: [
        { title: "Analistas en Turno", data: ccmAnalysts, icon: <UserCheck className="mr-2 h-4 w-4" /> },
        { title: "Monitoristas en Turno", data: ccmMonitors, icon: <Users className="mr-2 h-4 w-4" /> }
    ]},
    { key: 'security', leader: leaders.security, teams: [{ title: "Analistas en Turno", data: securityAnalysts, icon: <Users className="mr-2 h-4 w-4" /> }] },
    { key: 'investigaciones', leader: leaders.investigaciones, teams: [{ title: "Equipo de Análisis", data: investigacionesTeam, icon: <Users className="mr-2 h-4 w-4" /> }] }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamCards.length);
    }, 5000); // Change card every 5 seconds
    return () => clearInterval(interval);
  }, [teamCards.length]);

  return (
    <div className="space-y-6">
       <Card className="shadow-lg bg-card/50">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-headline">Resumen de Equipos en Turno</CardTitle>
          <CardDescription>Vista rápida del personal disponible en cada área de Loss Prevention.</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="relative w-full overflow-hidden mx-auto" style={{ maxWidth: '450px' }}>
         <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {teamCards.map((cardInfo) => (
             <div key={cardInfo.key} className="w-full flex-shrink-0 px-1">
                <Card className="shadow-lg flex flex-row overflow-hidden h-[300px]">
                    <div className="flex flex-col items-center justify-center gap-2 p-3 bg-muted/50 border-r w-[170px] shrink-0">
                        <Link href={cardInfo.leader.chatUrl} target="_blank" rel="noopener noreferrer">
                            <Avatar className="h-20 w-20 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                                <AvatarImage src={cardInfo.leader.photoUrl} alt={cardInfo.leader.name} />
                                <AvatarFallback>{getInitials(cardInfo.leader.name)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="text-center">
                            <p className="font-bold text-base whitespace-nowrap">{cardInfo.leader.name}</p>
                            <p className="flex items-center justify-center text-primary text-xs mt-1">
                                <cardInfo.leader.icon className="mr-1 h-3 w-3" />
                                {cardInfo.leader.role}
                            </p>
                        </div>
                    </div>
                    <div className="flex-grow p-4 space-y-2">
                        {cardInfo.teams.map(team => (
                            <TeamOnDuty key={team.title} title={team.title} teamData={team.data} icon={team.icon} />
                        ))}
                    </div>
                </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
