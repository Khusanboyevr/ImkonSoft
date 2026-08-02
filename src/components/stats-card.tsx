
import { Typography, Card } from "@material-tailwind/react";

interface StatsCardProps {
  count: string;
  title: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export function StatsCard({ count, title, icon: Icon }: StatsCardProps) {
  return (
    <Card color="transparent" shadow={false} className="flex flex-col items-start gap-2">
      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-orange-500" />
      </div>
      <Typography variant="h1" className="font-bold" color="blue-gray">
        {count}
      </Typography>
      <Typography variant="h6" color="blue-gray" className="mt-1 font-medium">
        {title}
      </Typography>
    </Card>
  );
}

export default StatsCard;
