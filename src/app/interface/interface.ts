export interface Player {
  id: string;
  name: string;
  level: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}
