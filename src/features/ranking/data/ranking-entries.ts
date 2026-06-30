export type RankingEntry = {
  position: number;
  participant: string;
  guild: string;
  score: number;
};

export const rankingEntries: RankingEntry[] = [
  {
    position: 1,
    participant: "Casa del Dragon Rojo",
    guild: "Combate",
    score: 980,
  },
  {
    position: 2,
    participant: "Orden del Sol",
    guild: "Arqueria",
    score: 940,
  },
  {
    position: 3,
    participant: "Hermandad de Acero",
    guild: "Justas",
    score: 905,
  },
  {
    position: 4,
    participant: "Clan Luna Antigua",
    guild: "Danza",
    score: 870,
  },
  {
    position: 5,
    participant: "Mesa de Mercaderes",
    guild: "Mercado",
    score: 845,
  },
  {
    position: 6,
    participant: "Forja del Norte",
    guild: "Artesania",
    score: 810,
  },
  {
    position: 7,
    participant: "Trovadores del Valle",
    guild: "Musica",
    score: 780,
  },
  {
    position: 8,
    participant: "Guardia de la Frontera",
    guild: "Combate",
    score: 760,
  },
  {
    position: 9,
    participant: "Circulo de Alquimistas",
    guild: "Saberes",
    score: 730,
  },
  {
    position: 10,
    participant: "Banderas de Cucuta",
    guild: "Comunidad",
    score: 700,
  },
];
