'use client';

import { Project } from '@/core/domain/entities/project.entity';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/core/presentation/components/common/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/core/presentation/components/common/ui/sidebar';
import { Bot, ChevronRight, Eye, File, Plus, Settings2, Users } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

type SidebarProjectProps = {
  projects: Project[];
};

const navigationItems = [
  {
    name: 'Playground',
    href: '/dashboard/projects/playground',
    icon: <Bot />,
  },
  {
    name: 'Project',
    href: '/dashboard/projects/project',
    icon: <Eye />,
  },
  {
    name: 'Teams',
    href: '/dashboard/projects/teams',
    icon: <Users />,
  },
  {
    name: 'Settings',
    href: '/dashboard/projects/settings',
    icon: <Settings2 />,
  },
];

const generateNavigationItems = (projectId: string) => {
  return navigationItems.map(item => ({
    ...item,
    href: `/dashboard/projects/${projectId}/${item.href.split('/').pop()}`,
  }));
};

export const Sidebar_Project = ({ projects }: SidebarProjectProps) => {
  const [currentCollapsibleProjectOpen, setCurrentCollapsibleProjectOpen] = useLocalStorage(
    'current-collapsible-project-open',
    '',
    { initializeWithValue: false },
  );

  const handleOpenChange = (projectId: string) => {
    if (currentCollapsibleProjectOpen === projectId) {
      setCurrentCollapsibleProjectOpen('');
    } else {
      setCurrentCollapsibleProjectOpen(projectId);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(project => (
          <Collapsible
            key={project.id}
            asChild
            open={currentCollapsibleProjectOpen === project.id}
            onOpenChange={() => handleOpenChange(project.id)}
          >
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/dashboard/projects/${project.id}`}>
                  <File />
                  <span className="truncate text-xs">
                    {project.title} | {project.description}
                  </span>
                </a>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    {generateNavigationItems(project.id).map(item => (
                      <SidebarMenuSubButton asChild key={item.name}>
                        <a href={item.href} className="text-xs text-muted-foreground">
                          {item.icon}
                          <span className="text-sx truncate">{item.name}</span>
                        </a>
                      </SidebarMenuSubButton>
                    ))}
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/dashboard/projects/new-project">
              <Plus className="mr-2 h-4 w-4" />
              <span className="truncate text-xs font-semibold">Create a new project</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
