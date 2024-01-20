"use client";
import {TrashIcon} from "lucide-react";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

import {useTeamStore} from "../store/teams/teams-store";

export default function Teams() {
  const router = useRouter();

  const {players, removePlayer, clearList, balanceTeams} = useTeamStore();

  useEffect(() => {
    useTeamStore.persist.rehydrate();
  }, []);

  return (
    <section className="fade z-20  flex h-full w-full flex-col justify-between gap-2 rounded-sm border-2 border-white bg-blackly/75 p-2 backdrop-blur-xl md:w-4/6 md:p-8">
      <Table>
        <TableCaption className="sr-only">Furvo de los sabados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Jugadores: {players.length}</TableHead>
            <TableHead className="text-right">Nivel</TableHead>
            <TableHead className="w-[30px] text-right">Borrar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.length > 0 ? (
            players.map((player) => (
              <TableRow key={player.id} className="fade">
                <TableCell className="font-medium first-letter:uppercase ">{player.name}</TableCell>
                <TableCell className="text-right">{player.level}</TableCell>
                <TableCell className="flex items-center justify-items-center text-right">
                  <TrashIcon
                    className="cursor-pointer rounded-full p-1 transition-all hover:text-rose-600 hover:ring-1 hover:ring-rose-600 "
                    onClick={() => removePlayer(player.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={3}>
                No hay jugadores.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {players.length >= 2 ? (
        <div className="fade justify-content-center flex items-center gap-4">
          <Button
            className="w-full border-2 border-rose-800 bg-transparent text-rose-600  hover:bg-rose-800 hover:text-white "
            type="button"
            onClick={() => {
              clearList();
              toast.success("Jugadores eliminados con exito.");
            }}
          >
            Resetear lista
          </Button>
          <Button
            className="w-full hover:bg-rose-800 hover:text-white"
            type="button"
            onClick={() => {
              balanceTeams();
              router.push("/teams");
            }}
          >
            Generar equipos
          </Button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
