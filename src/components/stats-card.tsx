
import { Typography, Card } from "@material-tailwind/react";

interface StatsCardProps {
  count: string;
  title: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export function StatsCard({ count, title, icon: Icon }: StatsCardProps) {
  return (
    <Card color="transparent" shadow={false} className="flex flex-col items-start gap-1.5">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: "rgba(232, 134, 90, 0.12)" }}
      >
        <Icon className="w-4 h-4" style={{ color: "var(--imk-glow-mid)" }} />
      </div>
      <Typography className="font-display font-normal text-3xl" style={{ color: "var(--imk-text-primary)" }}>
        {count}
      </Typography>
      <Typography className="text-xs font-medium" style={{ color: "var(--imk-text-secondary)" }}>
        {title}
      </Typography>
    </Card>
  );
}

export default StatsCard;
