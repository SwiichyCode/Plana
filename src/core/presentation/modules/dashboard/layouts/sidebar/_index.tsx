import { Project } from '@/core/domain/entities/project.entity';
import { Sidebar, SidebarContent } from '@/core/presentation/components/common/ui/sidebar';
import type { User } from '@clerk/nextjs/server';

import { Sidebar_Footer } from './sidebar-footer';
import { Sidebar_Header } from './sidebar-header';
import { Sidebar_Project } from './sidebar-project';

type DashboardSidebarProps = {
  projects: Project[];
  user: User;
};

export const DashboardSidebar = ({ projects, user }: DashboardSidebarProps) => {
  return (
    <Sidebar>
      <Sidebar_Header />
      <SidebarContent>
        <Sidebar_Project projects={projects} />
      </SidebarContent>
      <Sidebar_Footer
        firstName={user.firstName}
        emailAddress={user.externalAccounts[0]?.emailAddress}
        imageUrl={user.imageUrl}
      />
    </Sidebar>
  );
};
