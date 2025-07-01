
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

interface Manager {
  usuario: string;
  email: string;
  role: string;
  chatUrl: string;
}

const managersData: Manager[] = [
    { usuario: 'Omar García Valdez', email: 'omar.garciavaldez@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/uaqWncAAAAE' },
    { usuario: 'Daniel Mejía', email: 'daniel.mejiaibarra@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/5wnHL8AAAAE' },
    { usuario: 'Isidro Contreras', email: 'isidro.contreras@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jLW2ncAAAAE' },
    { usuario: 'Nestor Becerril', email: 'nestor.becerril@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/yd_Fb8AAAAE' },
    { usuario: 'Valeria Sanchez', email: 'valeria.sanchez@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/jY7ekCAAAAE' },
    { usuario: 'Samantha Aldape', email: 'samantha.aldape@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/tNS-kCAAAAE' },
    { usuario: 'Alberto Alviter', email: 'alberto.alviter@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/9FrMb8AAAAE' },
    { usuario: 'Basilio de Jesus Morales', email: 'basilio.morales@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/52DOkCAAAAE' },
    { usuario: 'Francisco Rene Tribouillier', email: 'francisco.tribouillier@mercadolibre.com.mx', role: 'Gerente', chatUrl: 'https://mail.google.com/chat/u/0/#chat/dm/gp8ekCAAAAE' },
];

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function ManagerPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-headline flex items-center">
          <Briefcase className="mr-2 h-6 w-6 text-primary" />
          Manager
        </CardTitle>
        <CardDescription>Contacto directo con el equipo de gerencia.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {managersData.map((manager) => (
             <Card key={manager.usuario} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center space-x-4">
                    <Link href={manager.chatUrl} target="_blank" rel="noopener noreferrer">
                        <Avatar className="h-16 w-16 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage src={`https://avatar.vercel.sh/${manager.email}.png?s=100`} alt={manager.usuario} />
                            <AvatarFallback>{getInitials(manager.usuario)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div>
                        <p className="font-bold text-base">{manager.usuario}</p>
                        <p className="text-sm text-muted-foreground">{manager.role}</p>
                    </div>
                </CardContent>
             </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
