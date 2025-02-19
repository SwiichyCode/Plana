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
import { ChevronRight, Eye, File, Plus, Settings2, Users } from 'lucide-react';

type SidebarProjectProps = {
  projects: Project[];
};

export const Sidebar_Project = ({ projects }: SidebarProjectProps) => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(project => (
          <Collapsible key={project.id} asChild>
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
                    <SidebarMenuSubButton asChild>
                      <a href={`/dashboard/projects/${project.id}`} className="text-xs text-muted-foreground">
                        <Eye />
                        <span className="text-sx truncate">Project</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href={`/dashboard/projects/${project.id}`} className="text-xs text-muted-foreground">
                        <Users />
                        <span className="text-sx truncate">Teams</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href={`/dashboard/projects/${project.id}/settings`} className="text-xs text-muted-foreground">
                        <Settings2 />
                        <span className="text-sx truncate">Settings</span>
                      </a>
                    </SidebarMenuSubButton>
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
