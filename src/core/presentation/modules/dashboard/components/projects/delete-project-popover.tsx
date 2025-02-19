import { Popover, PopoverContent, PopoverTrigger } from '@/core/presentation/components/common/ui/popover';

import { DeleteProjectForm } from './delete-project-form';

type ProjectDeletePopoverProps = {
  projectId: string;
  projectTitle: string;
};

export const DeleteProjectPopover = ({ projectId, projectTitle }: ProjectDeletePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <span className="text-sm font-semibold text-red-500 hover:underline">Delete this Project?</span>
      </PopoverTrigger>
      <PopoverContent align="start" side="top" className="space-y-4">
        <p className="text-sm font-semibold text-muted-foreground">
          Enter the Workspace name “{projectTitle}” to delete
        </p>

        <DeleteProjectForm projectId={projectId} projectTitle={projectTitle} />
      </PopoverContent>
    </Popover>
  );
};
