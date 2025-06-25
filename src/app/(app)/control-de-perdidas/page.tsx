"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

// --- REPs Availability Feature ---

const repsData = [
  { usuario: 'Andrés Navarrete', email: 'andres.navarreteleon@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'] },
  { usuario: 'Keyla Barbosa', email: 'keylaabril.barbosagonzalez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['viernes', 'sabado'] },
  { usuario: 'Jorge Sotero', email: 'jorge.sotero@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'] },
  { usuario: 'Esperanza Sánchez', email: 'esperanza.sanchez@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'] },
  { usuario: 'Salvador Bautista', email: 'salvador.bautista@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'] },
];

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

function RepsEnTurno() {
  const [onDutyReps, setOnDutyReps] = useState<{ usuario: string; email: string; horario: string; }[]>([]);

  const checkSchedules = useCallback(() => {
    const now = new Date();
    
    // Get current day and time in Mexico City, remove accents for matching.
    const dayOfWeek = new Intl.DateTimeFormat('es-MX', { weekday: 'long', timeZone: 'America/Mexico_City' })
      .format(now)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // "lunes", "martes", "miercoles", etc.

    const currentTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City', hour12: false }).format(now); // "HH:mm"

    const available = repsData.filter(rep => {
      // Check if it's a day off
      if (rep.diasNoDisponibles.includes(dayOfWeek)) {
        return false;
      }
      // Check if within the time range
      const [startTime, endTime] = rep.horario.split('-');
      return currentTime >= startTime && currentTime <= endTime;
    });

    setOnDutyReps(available);
  }, []);

  useEffect(() => {
    checkSchedules();
    const intervalId = setInterval(checkSchedules, 1200000); // Update every 20 minutes
    return () => clearInterval(intervalId);
  }, [checkSchedules]);

  return (
     <Card className="shadow-lg">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-headline flex items-center">
          <Users className="mr-2 h-4 w-4 text-primary" />
          REPs en Turno
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {onDutyReps.length > 0 ? (
          <ul className="space-y-2">
            {onDutyReps.map((rep) => (
              <li key={rep.usuario} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border-2 border-primary">
                   <AvatarImage src={`https://avatar.vercel.sh/${rep.email}.png?s=100`} alt={rep.usuario} />
                  <AvatarFallback>{getInitials(rep.usuario)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-xs">{rep.usuario}</p>
                  <p className="text-xs text-muted-foreground">{rep.horario}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center py-2 text-sm">
            No hay REPs disponibles.
          </p>
        )}
      </CardContent>
    </Card>
  );
}


// --- Main Page Component ---

export default function ControlDePerdidasPage() {
  const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/2a1228bc-36fb-4f28-8190-38a5149ee670/page/p_t5v3dj3pnd";
  const chatUrl = "https://mail.google.com/chat/u/0/#chat/dm/00i2ncAAAAE";
  const didierEmail = "alexis.tolentinorivera@mercadolibre.com.mx";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="flex items-center space-x-4">
              <Link href={chatUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={`https://avatar.vercel.sh/${didierEmail}.png?s=100`} alt="Foto de Didier Tolentino" />
                  <AvatarFallback>DT</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h3 className="text-xl font-bold">Didier Tolentino</h3>
                <p className="text-md text-muted-foreground">Coordinador de CP</p>
              </div>
            </div>
            
            <RepsEnTurno />
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
