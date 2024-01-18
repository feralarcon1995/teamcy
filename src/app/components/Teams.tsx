"use client";
import {TrashIcon} from "lucide-react";
import {useEffect} from "react";

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
  const {players, removePlayer, balanceTeams} = useTeamStore();

  useEffect(() => {
    useTeamStore.persist.rehydrate();
  }, []);

  return (
    <section className="fade flex h-full w-full flex-col justify-between gap-2 rounded-sm border-2 border-white p-2 md:max-w-[60%] md:p-8">
      <Table>
        <TableCaption>Furvo de los sabados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Jugador</TableHead>
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
                <TableCell className="flex items-center justify-items-center text-center">
                  <TrashIcon
                    className="hover:text-red cursor-pointer transition-all "
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
        <Button className="w-full" type="button" onClick={() => balanceTeams()}>
          Generar equipos
        </Button>
      ) : (
        ""
      )}
    </section>
  );
}
