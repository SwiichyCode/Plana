import { getInjection } from '#di/container';
import { SidebarProvider, SidebarTrigger } from '@/core/presentation/components/common/ui/sidebar';
import { DashboardSidebar } from '@/core/presentation/modules/dashboard/layouts/sidebar/_index';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const projects = await getInjection('ProjectService').findByOwner(user.id);

  return (
    <SidebarProvider>
      <DashboardSidebar projects={projects} user={user} />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
