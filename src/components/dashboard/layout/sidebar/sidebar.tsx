'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';
import { MEDIA_HOSTNAME, adminNavItems, userNavItems } from '@/lib/constants';
import { DashboardNav } from '@/components/dashboard/layout/sidebar/dashboard-nav';
import { useCurrentUser } from '@/hooks/use-current-user';
import { NavItem } from '@/types';
import { UserRole } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IconUser } from '@tabler/icons-react';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  let navItems: NavItem[] = [];
  const user = useCurrentUser();

  // Détermine les items de navigation en fonction du rôle
  switch (user?.role) {
    case UserRole.ADMIN:
      navItems = adminNavItems;
      break;

    case UserRole.USER:
      navItems = userNavItems;
      break;
  }

  return (
    <nav
      className={cn(
        `relative hidden h-full overflow-y-auto ease-in-out lg:flex lg:flex-col`,
        !isMinimized ? 'w-64' : 'w-[62px]',
        className,
      )}
      style={{ transition: 'width 0.2s' }}>
      <div className={cn('h-full space-y-4 py-2 text-white')}>
        <div className="h-full px-3">
          <div className={cn('h-full space-y-6', isMinimized ? 'flex flex-col justify-start' : 'relative')}>
            {!isMinimized && (
              <div className={'mb-5 flex flex-col items-center gap-3'}>
                <div className="mt-8">
                  <Avatar className="h-20 w-20 ">
                    <AvatarImage
                      className="object-cover"
                      src={`${MEDIA_HOSTNAME}${user?.image}`}
                      alt={user?.name ?? ''}
                    />
                    <AvatarFallback className="bg-white text-xl text-black">
                      <IconUser className="h-9 w-9" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-col items-center">
                  <h1 className="text-center text-lg font-bold">{user?.name}</h1>
                  {user?.role === UserRole.ADMIN && <p className="text-sm font-medium text-white">{user?.role}</p>}
                </div>
              </div>
            )}

            {/* Affiche les éléments de navigation */}
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
