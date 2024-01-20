import {cn} from "@/lib/utils";
interface XIconProps {
  className?: string;
}

export default function XIcon({className}: XIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
        fill="currentColor"
      />
    </svg>
  );
}
