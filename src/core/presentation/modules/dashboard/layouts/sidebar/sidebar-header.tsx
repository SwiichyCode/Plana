import { SidebarHeader, SidebarMenu, SidebarMenuButton } from '@/core/presentation/components/common/ui/sidebar';
import { Command } from 'lucide-react';

export const Sidebar_Header = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuButton size="lg" asChild>
          <a href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Command className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Plana Inc</span>
              <span className="truncate text-xs">Enterprise</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
  );
};
