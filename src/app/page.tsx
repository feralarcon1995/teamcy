"use client";
import Link from "next/link";

import Form from "./components/Form";
import Teams from "./components/Teams";

export default function Home() {
  return (
    <section className="mx-auto grid min-h-screen place-items-center gap-3 md:gap-8 ">
      <Link className="fade py-5 text-end text-xl transition-all hover:underline" href="/teams">
        Ver equipos &#8594;
      </Link>
      <Form />
      <Teams />
    </section>
  );
}
