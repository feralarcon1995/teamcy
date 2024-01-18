import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className=" mx-auto grid h-full w-full grid-cols-1 gap-2 p-2 md:p-8 ">
      <Skeleton className="cols-span-2 h-6 w-96 place-self-center" />
      <Skeleton className="h-96 w-full md:w-8/12" />
      <Skeleton className="h-96 w-full md:w-8/12" />
    </div>
  );
}
