"use client";
import {useEffect} from "react";
import Link from "next/link";

import {useTeamStore} from "../store/teams/teams-store";

export default function TeamsPage() {
  const {teams} = useTeamStore();
  const [team1, team2] = teams;

  useEffect(() => {
    useTeamStore.persist.rehydrate();
  }, []);

  return (
    <section className=" relative mx-auto grid h-full w-full grid-cols-1 gap-2  p-2 md:grid-cols-2 md:p-8">
      <div className="absolute flex h-dvh w-full items-center justify-center">
        <div className="triangle-left -top-4 -z-20">
          <div className="h-80 w-20 max-w-full rounded-full bg-rose-800 blur-2xl sm:w-80	" />
        </div>
        <div className="triangle-right top-4 -z-10 ">
          <div className=" h-80 w-20 max-w-full rounded-full bg-fuchsia-900	blur-2xl sm:w-80	" />
        </div>
      </div>
      <Link
        className="fade z-20 py-5 text-xl transition-all hover:text-rose-600 hover:underline hover:underline-offset-2 md:col-span-2"
        href="/"
      >
        ← Rearmar equipos
      </Link>
      {teams.length > 0 ? (
        <>
          <article className="fade z-30 w-full rounded-sm border-2 border-white">
            <h2 className="flex items-center justify-between bg-zinc-900  p-4">
              Equipo 1 <span>Jugadores: {team1.players.length}</span>
            </h2>
            <ul>
              {team1.players.map((player) => (
                <li
                  key={player.id}
                  className="flex items-center  justify-between  bg-blackly/75  p-4 backdrop-blur-xl first-letter:uppercase even:bg-zinc-900/75"
                >
                  {player.name} <span className="font-bold">★{player.level}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="fade z-30 w-full rounded-sm border-2 border-white">
            <h2 className="flex items-center justify-between bg-zinc-900  p-4">
              Equipo 2 <span>Jugadores: {team2.players.length}</span>
            </h2>
            <ul className="">
              {team2.players.map((player) => (
                <li
                  key={player.id}
                  className="flex items-center  justify-between  bg-blackly/75  p-4 backdrop-blur-xl first-letter:uppercase even:bg-zinc-900/75"
                >
                  {player.name} <span className="font-bold">★{player.level}</span>
                </li>
              ))}
            </ul>
          </article>
        </>
      ) : (
        <span className="fade col-span-2 flex min-h-screen items-center justify-center  text-center text-xl">
          No hay equipos aun.
        </span>
      )}
    </section>
  );
}
