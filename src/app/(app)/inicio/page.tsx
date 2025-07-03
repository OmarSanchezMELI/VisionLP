
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, ShieldAlert, Video, Lock, FileSearch, Briefcase, BotIcon, ClipboardList } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const featureCards = [
  { href: '/control-de-perdidas', label: 'Control de Pérdidas', icon: ShieldAlert, description: "Gestión y visualización de datos clave para el control de pérdidas." },
  { href: '/ccm-lp', label: 'CCM', icon: Video, description: "Herramientas y personal del equipo de CCM." },
  { href: '/security', label: 'Security', icon: Lock, description: "Equipo, análisis y tablero de control de Security." },
  { href: '/investigaciones', label: 'Investigaciones', icon: FileSearch, description: "Análisis de datos, equipo y tableros de investigación." },
  { href: '/bot', label: 'BOT', icon: BotIcon, description: "Automatización y visualización de reportes." },
  { href: '/gestion-lp', label: 'Gestión LP', icon: ClipboardList, description: "Directorio de contactos y herramientas de gestión." },
];

export default function InicioPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-headline flex items-center">
                        <Home className="mr-3 h-8 w-8 text-primary" />
                        Bienvenido a LP Vision
                    </CardTitle>
                    <CardDescription className="text-base pt-2">
                        Hola, {user?.email ? user.email.split('@')[0] : 'usuario'}. Aquí tienes un resumen de las herramientas disponibles.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featureCards.map((feature) => (
                    <Card key={feature.href} className="shadow-md hover:shadow-xl transition-shadow flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <feature.icon className="mr-3 h-6 w-6 text-primary" />
                                {feature.label}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm">
                                {feature.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={feature.href}>
                                    Ir a {feature.label}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
