"use client";

import { PokemonAbilities } from "@/app/interfaces/pokemons";
import { Button, Card, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextBox } from "../../global/TextBox";
import { useRouter } from "next/navigation";
import { Searcher } from "../../global/searcher/Searcher";
import LoadingScreen from "../../global/LoadingScreen";

interface Urls {
  url: string;
  urlFront: string;
  urlBack: string;
  urlFrontShiny: string;
  urlBackShiny: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  abilities: PokemonAbilities[];
  height: number;
  weight: number;
  urls: Urls;
}

const Details = (props: any) => {
  const router = useRouter();
  const { params } = props;
  const { details } = params;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetails>();

  //--- UseEffects -------
  useEffect(() => {
    if (details) getData(null);
  }, [details]);

  //------ Functions --------
  const getData = async (search: String | null) => {
    setError(false);
    setLoading(true);
    try {
      let url;
      url = `https://pokeapi.co/api/v2/pokemon/${(search && search.length > 0) ? search : details}`;

      let res = await fetch(url);
      if (res?.status == 404) {
        setLoading(false);
        return setError(true);
      }
      const entries = await res.json();
      console.log({ entries });

      let listAbilities: any = [];
      entries?.types?.map((itemAbility: any) => {
        listAbilities.push({
          name: itemAbility.type.name,
        });
      });

      setPokemon({
        id: entries.id,
        name: entries.name,
        abilities: listAbilities,
        height: entries.height,
        weight: entries.weight,
        urls: {
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${entries.id}.png`,
          urlFront: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entries.id}.png`,
          urlBack: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${entries.id}.png`,
          urlFrontShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${entries.id}.png`,
          urlBackShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${entries.id}.png`,
        },
      });
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleClick = (search: string) => getData(search.trim());

  return (
    <>
      {!loading ? (
        <>
          <Grid.Container className="card-pokemon-details" gap={7}>
            <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
              <a onClick={() => router.back()} className="go-back-button">
                <Image
                  src={"/assets/icons/Back.svg"}
                  className="img-logo-full"
                  alt="pokemon-logo"
                  width={50}
                  height={50}
                />
              </a>
            </Grid>
            <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
              <div className="searcher-box">
                <Searcher handleClick={handleClick} />
              </div>
            </Grid>
          </Grid.Container>
          {!error && pokemon ? (
            <Grid.Container className="card-pokemon-details" gap={7}>
              <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                <Card className="card-pokemon-details-images">
                  <Card.Body className="body">
                    <Image
                      src={pokemon?.urls?.url}
                      alt={`pokemon-${pokemon.id}`}
                      width={150}
                      height={150}
                    />
                  </Card.Body>
                  <Card.Footer className="footer">
                    <Image
                      src={pokemon?.urls?.urlFront}
                      alt={`pokemon-${pokemon.id}`}
                      width={100}
                      height={100}
                    />
                    <Image
                      src={pokemon?.urls?.urlBack}
                      alt={`pokemon-${pokemon.id}`}
                      width={100}
                      height={100}
                    />
                  </Card.Footer>
                </Card>
              </Grid>
              <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
                <Card className="card-pokemon-details-info">
                  <Card.Header className="header">
                    <Text h1>{pokemon.name}</Text>
                    <div className="box">
                      {pokemon?.abilities.map((itemAbility: any, index:number) => {
                        return (
                          <TextBox
                            text={itemAbility.name}
                            color={
                              itemAbility.name == "grass"
                                ? "green"
                                : itemAbility.name == "poison"
                                ? "purple"
                                : itemAbility.name == "fire"
                                ? `orange`
                                : "blue"
                            }
                            key={index}
                          />
                        );
                      })}
                    </div>
                  </Card.Header>
                  <Card.Body className="body">
                    <Text>Pokedex Number</Text>
                    <Text p>{pokemon.id}</Text>
                    <hr />
                    <Text>Height</Text>
                    <Text p>{pokemon.height}</Text>
                    <hr />
                    <Text>Weight</Text>
                    <Text p>{pokemon.weight}</Text>
                    <hr />
                    <Text>Shiny</Text>
                    <div className="url-box">
                      <Image
                        src={pokemon?.urls?.urlFrontShiny}
                        alt={`pokemon-${pokemon.id}`}
                        width={100}
                        height={100}
                      />
                      <Image
                        src={pokemon?.urls?.urlBackShiny}
                        alt={`pokemon-${pokemon.id}`}
                        width={100}
                        height={100}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Grid>
            </Grid.Container>
          ) : (
            <div className="pokemon-not-founded">
              <Text h3>Pokemon not founded</Text>
            </div>
          )}
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Details;
