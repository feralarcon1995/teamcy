import type {Player, Team} from "../../interface/interface";

import {redirect} from "next/navigation";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {toast} from "sonner";

interface Store {
  players: Player[];
  teams: Team[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  balanceTeams: () => void;
}

const balanceTeams = () => {
  const {players, addPlayer} = useTeamStore.getState();

  const playersCopy = [...players];

  playersCopy.sort((a, b) => a.level - b.level);

  const team1 = [];
  const team2 = [];

  for (let i = 0; i < playersCopy.length; i++) {
    if (i % 2 === 0) {
      team1.push(playersCopy[i]);
    } else {
      team2.push(playersCopy[i]);
    }
  }

  const team1Object: Team = {id: "team1", name: "Team 1", players: team1};
  const team2Object: Team = {id: "team2", name: "Team 2", players: team2};

  useTeamStore.setState({players: [], teams: [team1Object, team2Object]});

  team1.forEach((player) => addPlayer(player));
  team2.forEach((player) => addPlayer(player));
  redirect("/teams");
};

export const useTeamStore = create<Store>()(
  persist(
    (set) => ({
      players: [],
      teams: [],
      addPlayer: (player) => set((state) => ({players: [...state.players, player]})),
      removePlayer: (id) =>
        set((state) => {
          const playerToRemove = state.players.find((player) => player.id === id);
          const newPlayers = state.players.filter((player) => player.id !== id);

          if (playerToRemove) {
            toast.success(`${playerToRemove.name} fue eliminado.`);
          }

          return {players: newPlayers};
        }),
      balanceTeams: () => balanceTeams(),
    }),
    {
      name: "team-storage",
      skipHydration: true,
    },
  ),
);
