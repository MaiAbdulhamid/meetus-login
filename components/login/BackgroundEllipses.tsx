import {
  EllipseFourIcon,
  EllipseOneIcon,
  EllipseThreeIcon,
  EllipseTwoIcon,
} from "@/components/icons";

export function BackgroundEllipses() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <EllipseOneIcon className="absolute top-0 right-0 z-[4]" />
      <EllipseTwoIcon className="absolute bottom-0 right-0 z-[3]" />
      <EllipseThreeIcon className="absolute bottom-0 left-0 z-[2]" />
      <EllipseFourIcon className="absolute top-0 left-0 z-[1]" />
    </div>
  );
}
