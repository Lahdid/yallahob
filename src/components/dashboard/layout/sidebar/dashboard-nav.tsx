import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IconChevronDown } from '@tabler/icons-react';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({ items, setOpen, isMobileNav = false }: DashboardNavProps) {
  const path = usePathname(); // Get current route
  const { isMinimized, toggle } = useSidebar();

  if (!items?.length) {
    return null;
  }

  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  // Initialize with all parent items open
  useEffect(() => {
    const parentTitles = items.filter((item) => item.children).map((item) => item.title);
    setOpenGroups(new Set(parentTitles));
  }, [items]);

  const handleToggle = (title: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <nav className="flex flex-col justify-between">
      <TooltipProvider>
        <div className="flex h-full flex-col justify-start gap-2 py-2">
          {items.map((item) => {
            // Group items
            if (item.children) {
              const isChildActive = item.children.some((c) => path === c.href);
              const isGroupOpen = openGroups.has(item.title) || isChildActive;

              if (isMinimized) {
                // When minimized, directly show children
                return (
                  <div key={item.title} className="flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Tooltip key={child.title}>
                        <TooltipTrigger asChild>
                          <Link
                            href={child.href!}
                            className={cn(
                              'flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-white hover:text-black',
                              path === child.href ? 'bg-white text-black' : 'text-white',
                            )}
                            onClick={() => setOpen?.(false)}>
                            {child.icon}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>{child.title}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                );
              }

              // Normal view for non-minimized state
              return (
                <div key={item.title}>
                  <button
                    onClick={() => handleToggle(item.title)}
                    className={cn('flex w-full items-center justify-between rounded px-2 py-2 text-white')}>
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm">{item.title}</span>
                    </div>
                    <IconChevronDown
                      className={cn('transition-transform', isGroupOpen ? 'rotate-180' : '')}
                      size={16}
                    />
                  </button>

                  {isGroupOpen && (
                    <div className="ml-4 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href!}
                          className={cn(
                            'flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-white hover:text-black',
                            path === child.href ? 'bg-white text-black' : 'text-white',
                          )}
                          onClick={() => setOpen?.(false)}>
                          {child.icon}
                          <span>{child.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Single items
            const isActive = path === item.href;
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href!}
                    className={cn(
                      'flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-white hover:text-black',
                      isActive ? 'bg-white text-black' : 'text-white',
                    )}
                    onClick={() => setOpen?.(false)}>
                    {item.icon}
                    {!isMinimized && <span>{item.title}</span>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent className={cn(isMinimized ? 'block' : 'hidden')}>{item.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </nav>
  );
}
