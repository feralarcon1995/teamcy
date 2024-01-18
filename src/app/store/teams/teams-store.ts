import type {Player, Team} from "../../interface/interface";

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
const balanceTeams = (items: Player[]): Team[] => {
  const n = items.length;
  let bestDiff = Infinity;
  let teams: Team[] = [];

  for (let i = 0; i < 1 << n; i++) {
    const team1: Player[] = [];
    const team2: Player[] = [];
    let sum1 = 0;
    let sum2 = 0;

    for (let j = 0; j < n; j++) {
      if ((i & (1 << j)) !== 0) {
        team1.push(items[j]);
        sum1 += items[j].level;
      } else {
        team2.push(items[j]);
        sum2 += items[j].level;
      }
    }

    const diff = Math.abs(sum1 - sum2);

    if (diff < bestDiff) {
      bestDiff = diff;
      teams = [
        {id: "team1", name: "Team 1", players: team1.slice()},
        {id: "team2", name: "Team 2", players: team2.slice()},
      ];
    }
  }

  return teams;
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
      balanceTeams: () => set((state) => ({teams: balanceTeams(state.players)})),
    }),
    {
      name: "team-storage",
      skipHydration: true,
    },
  ),
);
