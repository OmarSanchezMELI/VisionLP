"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cctv, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface StaffMember {
  usuario: string;
  email: string;
  horario: string;
  diasNoDisponibles: string[];
  chatUrl: string;
}

// --- Datos del personal de CCM ---

const analistaData: StaffMember[] = [
  { usuario: 'Michelle Toscano', email: 'michelle.toscano@mercadolibre.com.mx', horario: '09:00-18:00', diasNoDisponibles: ['sabado', 'domingo'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jCzykCAAAAE' },
];

const monitoristasData: StaffMember[] = [
  { usuario: 'Yang Madgiel Castro Zanabria', email: 'yang.castro@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/obfekCAAAAE' },
  { usuario: 'Maria Guadalupe Chavez Morales', email: 'mariaguadalupe.chavez@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/4dAukCAAAAE' },
  { usuario: 'Jorge Alberto Chable Ramirez', email: 'jorge.chable@mercadolibre.com.mx', horario: '06:00-15:30', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/7OvukCAAAAE' },
  { usuario: 'Samantha Echeverria Roque', email: 'samantha.echeverria@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/pFCukCAAAAE' },
  { usuario: 'Juan Revilla Torres', email: 'juan.revilla@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jYkOkCAAAAE' },
  { usuario: 'Erick Ulloa', email: 'erick.ulloa@mercadolibre.com.mx', horario: '12:40-21:40', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/0kVukCAAAAE' },
  { usuario: 'Roberto Carlos Rodriguez Vega', email: 'robertocarlos.rodriguez@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['domingo', 'lunes'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/7LrukCAAAAE' },
  { usuario: 'Ricardo Javier Solorio Martinez', email: 'ricardo.solorio@mercadolibre.com.mx', horario: '21:40-06:00', diasNoDisponibles: ['viernes', 'sabado'], chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/6l2-kCAAAAE' },
];

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// --- Componente de Disponibilidad del Personal de CCM ---

function CcmStaffEnTurno() {
  const [onDutyAnalistas, setOnDutyAnalistas] = useState<StaffMember[]>([]);
  const [onDutyMonitoristas, setOnDutyMonitoristas] = useState<StaffMember[]>([]);

  const checkSchedules = useCallback(() => {
    const now = new Date();
    
    const dayOfWeek = new Intl.DateTimeFormat('es-MX', { weekday: 'long', timeZone: 'America/Mexico_City' })
      .format(now)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const currentTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City', hour12: false }).format(now);

    const filterAvailable = (data: StaffMember[]) => data.filter(person => {
      if (person.diasNoDisponibles.includes(dayOfWeek)) {
        return false;
      }
      const [startTime, endTime] = person.horario.split('-');
      
      // Handle overnight shifts
      if (startTime > endTime) {
        return currentTime >= startTime || currentTime <= endTime;
      }
      
      // Handle regular shifts
      return currentTime >= startTime && currentTime <= endTime;
    });

    setOnDutyAnalistas(filterAvailable(analistaData));
    setOnDutyMonitoristas(filterAvailable(monitoristasData));
  }, []);

  useEffect(() => {
    checkSchedules();
    const intervalId = setInterval(checkSchedules, 1200000); // Actualiza cada 20 minutos
    return () => clearInterval(intervalId);
  }, [checkSchedules]);

  const renderStaffList = (staff: StaffMember[], emptyMessage: string) => {
    if (staff.length > 0) {
      return (
        <ul className="space-y-2">
          {staff.map((person) => (
            <li key={person.usuario} className="flex items-center space-x-2">
              <Link href={person.chatUrl} target="_blank" rel="noopener noreferrer" className={person.chatUrl === '#' ? 'pointer-events-none' : ''}>
                <Avatar className="h-8 w-8 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                   <AvatarImage src={`https://avatar.vercel.sh/${person.email}.png?s=100`} alt={person.usuario} />
                  <AvatarFallback>{getInitials(person.usuario)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <p className="font-semibold text-xs">{person.usuario}</p>
                <p className="text-xs text-muted-foreground">{person.horario}</p>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p className="text-muted-foreground text-center py-1 text-sm">
        {emptyMessage}
      </p>
    );
  };

  return (
    <Card className="shadow-lg h-full">
      <CardContent className="p-3 flex flex-col space-y-3">
        <div>
          <CardTitle className="text-sm font-headline flex items-center mb-2">
            <Users className="mr-2 h-4 w-4 text-primary" />
            Analista en Turno
          </CardTitle>
          {renderStaffList(onDutyAnalistas, "No hay analistas disponibles.")}
        </div>
        <Separator />
        <div>
          <CardTitle className="text-sm font-headline flex items-center mb-2">
            <Users className="mr-2 h-4 w-4 text-primary" />
            Monitoristas en Turno
          </CardTitle>
          {renderStaffList(onDutyMonitoristas, "No hay monitoristas disponibles.")}
        </div>
      </CardContent>
    </Card>
  );
}


// --- Componente Principal de la Página CCM ---

export default function CCMPage() {
  const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/3fe8c1d0-7995-45c8-91b2-0fe6e2e1be76/page/jnuVE";
  const alejandraPhotoUrl = "https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Alejandra%20Lucero.jpeg";
  const alejandraChatUrl = "https://mail.google.com/chat/u/0/#chat/dm/_DHukCAAAAE";

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Cctv className="mr-2 h-6 w-6 text-primary" />
          CCM
        </CardTitle>
        <CardDescription>Visualización de datos clave para CCM.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="flex items-center space-x-4">
              <Link href={alejandraChatUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={alejandraPhotoUrl} alt="Foto de Alejandra Lucero" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h3 className="text-xl font-bold">Alejandra Lucero</h3>
                <p className="text-md text-muted-foreground">Líder de CCM</p>
              </div>
            </div>
            
            <CcmStaffEnTurno />
          </div>
          
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
      </CardContent>
    </Card>
  );
}
