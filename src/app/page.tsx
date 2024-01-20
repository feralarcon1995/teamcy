"use client";
import Link from "next/link";

import PlayerForm from "./components/PlayerForm";
import Teams from "./components/Teams";

export default function Home() {
  return (
    <section className="relative mx-auto grid	 max-h-full min-h-screen place-items-center gap-3 md:gap-8">
      <div className="m-screen absolute flex w-full items-center justify-center ">
        <div className="triangle-left -top-4 -z-20">
          <div className="h-80 w-80 max-w-full rounded-full bg-rose-800 blur-2xl" />
        </div>
        <div className="triangle-right top-4 -z-10 ">
          <div className=" h-80 w-80 max-w-full rounded-full bg-fuchsia-900	blur-2xl" />
        </div>
      </div>
      <Link
        className="fade z-20 py-5 text-end text-xl transition-all hover:text-rose-600 hover:underline hover:underline-offset-2"
        href="/teams"
      >
        Ver equipos &#8594;
      </Link>
      <PlayerForm />
      <Teams />
    </section>
  );
}
