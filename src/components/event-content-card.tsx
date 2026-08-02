import Image from "next/image";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

const CARD_ICONS: Record<string, React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>> = {
  "Dasturlash": GlobeAltIcon,
  "Mobil ilovalar": DevicePhoneMobileIcon,
  "Biznesni avtomatlashtirish": CogIcon,
};

interface EventContentCardProps {
  title: string;
  des: string;
  name: string;
  position: string;
  panel: string;
  img: string;
}
export function EventContentCard({
  title,
  des,
  name,
  position,
  panel,
  img,
}: EventContentCardProps) {
  const Icon = CARD_ICONS[panel] || GlobeAltIcon;

  return (
    <Card
      color="transparent"
      shadow={false}
      className="lg:!flex-row mb-10 lg:items-end"
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="h-[32rem] max-w-[28rem] shrink-0"
      >
        <Image
          width={768}
          height={768}
          src={img}
          alt="testimonial image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="col-span-full lg:col-span-3">
        <Typography variant="h6" color="blue-gray" className="mb-4">
          {panel}
        </Typography>
        <Typography variant="h2" color="blue-gray" className="mb-4 font-medium">
          {title}
        </Typography>
        <Typography className="mb-12 md:w-8/12 font-medium !text-gray-500">
          {des}
        </Typography>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-0.5">
              {name}
            </Typography>
            <Typography variant="small" className="font-normal !text-gray-500">
              {position}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default EventContentCard;
