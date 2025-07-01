
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileSearch, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

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
  chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE', // Assuming this is Omar García Valdez's chat
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
        <CardDescription>Equipo de Investigaciones y Análisis de Datos.</CardDescription>
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
      </CardContent>
    </Card>
  );
}
