
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ClipboardList, Users } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contact {
  usuario: string;
  email?: string;
  role: string;
  chatUrl: string;
  photoUrl?: string;
}

// Consolidated list of all contacts from the application
const allContacts: Contact[] = [
  // Leaders
  { usuario: 'Didier Tolentino', role: 'Coordinador de CP', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/unnamed.webp', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/00i2ncAAAAE' },
  { usuario: 'Omar García', email: 'omar.garciavaldez@mercadolibre.com.mx', role: 'Supervisor de Investigaciones', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Garcia.jpeg', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE' },
  
  // Managers
  { usuario: 'Alberto Alviter', email: 'alberto.alviter@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9FrMb8AAAAE' },
  { usuario: 'Basilio de Jesus Morales', email: 'basilio.morales@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/52DOkCAAAAE' },
  { usuario: 'Francisco Rene Tribouillier', email: 'francisco.tribouillier@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/gp8ekCAAAAE' },
  { usuario: 'Isidro Contreras', email: 'isidro.contreras@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jLW2ncAAAAE' },
  { usuario: 'Nestor Becerril', email: 'nestor.becerril@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/yd_Fb8AAAAE' },
  { usuario: 'Samantha Aldape', email: 'samantha.aldape@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/tNS-kCAAAAE' },
  { usuario: 'Valeria Sanchez', email: 'valeria.sanchez@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jY7ekCAAAAE' },

  // Investigations Team
  { usuario: 'Omar Sánchez', email: 'omar.sanchezfigueroa@mercadolibre.com.mx', role: 'Analista Sr BI', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Omar%20Sanchez.jpeg', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE' },
  { usuario: 'Daniel Mejía', email: 'daniel.mejiaibarra@mercadolibre.com.mx', role: 'Analista Jr. de Investigaciones', photoUrl: 'https://raw.githubusercontent.com/OmarSanchezMELI/ROBMeLi/refs/heads/main/Daniel%20Mejia.webp', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5wnHL8AAAAE' },

  // REPs Team
  { usuario: 'Andrés Navarrete', email: 'andres.navarreteleon@mercadolibre.com.mx', role: 'REP', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/-fzFYCAAAAE' },
  { usuario: 'Keyla Barbosa', email: 'keylaabril.barbosagonzalez@mercadolibre.com.mx', role: 'REP', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9n-1YCAAAAE' },
  { usuario: 'Jorge Sotero', email: 'jorge.sotero@mercadolibre.com.mx', role: 'REP', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/zMHVYCAAAAE' },
  { usuario: 'Esperanza Sánchez', email: 'esperanza.sanchez@mercadolibre.com.mx', role: 'REP', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/mgK5YCAAAAE' },
  { usuario: 'Salvador Bautista', email: 'salvador.bautista@mercadolibre.com.mx', role: 'REP', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/ug2NYCAAAAE' },
].sort((a, b) => a.usuario.localeCompare(b.usuario));


const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};


export default function GestionLpPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <ClipboardList className="mr-2 h-6 w-6 text-primary" />
          Gestión LP
        </CardTitle>
        <CardDescription>Directorio de contactos y herramientas de gestión.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contactos" className="w-full pt-4">
            <TabsList>
                <TabsTrigger value="contactos">
                    <Users className="mr-2 h-4 w-4" />
                    Contactos
                </TabsTrigger>
            </TabsList>
            <TabsContent value="contactos" className="mt-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allContacts.map((contact) => (
                        <Card key={contact.usuario} className="shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-4 flex items-center space-x-4">
                                <Link href={contact.chatUrl} target="_blank" rel="noopener noreferrer">
                                    <Avatar className="h-16 w-16 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                                        <AvatarImage src={contact.photoUrl || (contact.email ? `https://avatar.vercel.sh/${contact.email}.png?s=100` : undefined)} alt={contact.usuario} />
                                        <AvatarFallback>{getInitials(contact.usuario)}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <p className="font-bold text-base">{contact.usuario}</p>
                                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
