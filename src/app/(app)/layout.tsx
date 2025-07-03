
"use client";

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MercadoLibreLogo } from '@/components/MercadoLibreLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { ShieldAlert, Lock, Briefcase, BotIcon, LogOut, LayoutDashboard, FileSearch, ClipboardList, Siren, Video, Home } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


function WarRoomButton() {
  const meetUrl = "https://meet.google.com/gjp-iicp-jwd";

  const handleConfirm = () => {
    window.open(meetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Siren className="mr-2 h-4 w-4" />
          War Room Siniestros
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmación de Acción Urgente</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estas seguro de que quieres unirte al War Room de Siniestros? Esta acción es para emergencias.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} variant="destructive">
            Unirme ahora
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
       <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold text-lp-blue font-headline">Visión LP</h1>
      </div>
      <div className="flex items-center justify-end gap-4">
        <WarRoomButton />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png?s=100`} alt={user.email} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.email.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Sesión activa como</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Skeleton className="h-10 w-10 rounded-full" />
        )}
      </div>
    </header>
  );
}

function AppSidebar() {
    const pathname = usePathname();
    const { setOpenMobile, isMobile } = useSidebar();
    const { logout } = useAuth();

    const handleLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    const navItems = [
        { href: '/inicio', label: 'Inicio', icon: Home },
        { href: '/control-de-perdidas', label: 'Control de Pérdidas', icon: ShieldAlert },
        { href: '/ccm-lp', label: 'CCM', icon: Video },
        { href: '/security', label: 'Security', icon: Lock },
        { href: '/investigaciones', label: 'Investigaciones', icon: FileSearch },
        { href: '/manager', label: 'Manager', icon: Briefcase },
        { href: '/bot', label: 'BOT', icon: BotIcon },
        { href: '/gestion-lp', label: 'Gestión LP', icon: ClipboardList },
    ];

    return (
        <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r border-sidebar-border shadow-md z-40">
            <SidebarHeader className="p-4 items-center justify-center hidden group-data-[state=expanded]:flex">
                 <MercadoLibreLogo className="w-auto h-10" />
            </SidebarHeader>
            <SidebarContent className="p-2">
            <SidebarMenu>
                {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href!)}
                        tooltip={{children: item.label, side: "right", className: "bg-primary text-primary-foreground"}}
                        aria-label={item.label}
                        onClick={handleLinkClick}
                    >
                        <Link href={item.href!}>
                            <item.icon className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2 hidden group-data-[state=expanded]:flex">
                <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
         <LayoutDashboard className="h-16 w-16 animate-pulse text-primary" />
         <p className="mt-4 text-lg text-muted-foreground">Cargando aplicación...</p>
      </div>
    );
  }
  
  return (
    <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
            <AppHeader />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
