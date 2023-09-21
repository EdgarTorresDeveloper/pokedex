import { Card, Grid, Text } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pokemon } from "../../../interfaces/pokemons";
import Image from "next/image";
import { TextBox } from "../TextBox";
import Link from "next/link";

interface pagePaginationType {
  searchQuery: string | undefined | null;
  limit: number;
  offset: number;
}

interface layoutTable {
  data?: Pokemon[];
}

export default function LayoutCards(props: layoutTable) {
  //--------- Hooks to save data ---------
  const { data } = props;

  return (
    <Grid.Container gap={3}>
      {data?.map((item: any, index: number) => {
        return (
          <Grid xs={12} sm={6} md={6} lg={4} xl={4} key={index}>
            <Card className="card-pokemon">
              <Link href={`/details/${item.id}`}>
                <Card.Header className="header">
                  <Text b>{item.name}</Text>
                  <Text>{item.id}</Text>
                </Card.Header>
                <Card.Body className="body">
                  <Image
                    src={item?.url}
                    alt={`pokemon-${item.id}`}
                    width={150}
                    height={150}
                  />
                </Card.Body>
                <Card.Footer>
                  {item?.abilities.map((itemAbility: any, index: number) => {
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
                </Card.Footer>
              </Link>
            </Card>
          </Grid>
        );
      })}
    </Grid.Container>
  );
}
