export interface PokemonAbilities {
  name: String;
}

export interface Pokemon {
  id: Number;
  name: string;
  url: string;
  abilities: PokemonAbilities[];
}
