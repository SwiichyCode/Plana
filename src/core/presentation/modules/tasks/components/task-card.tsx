import { Card, CardContent, CardFooter, CardHeader } from '@/core/presentation/components/common/ui/card';

type TaskCardProps = {
  id: string;
  title: string;
  description: string;
  status: 'Todo' | 'InProgress' | 'Completed' | 'OnHold';
};

export const TaskCard = ({ id, title, description, status }: TaskCardProps) => {
  return (
    <Card key={id}>
      <CardHeader>
        <h2 className="text-2xl font-bold">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{status}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
