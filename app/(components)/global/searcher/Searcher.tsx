"use client";
import { Grid } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

type Search = {
  handleClick: (search: string) => void;
};

export const Searcher = (props: Search) => {
  const { handleClick } = props;
  const [search, setSearch] = useState("");

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <Grid.Container className="searcher mt-5">
      <Grid xs={12} className="box">
        <input
          type="text"
          placeholder="Search"
          onChange={(val) => handleChange(val)}
        />
        <button onClick={() => handleClick(search)}>
          <Image
            src={"/assets/icons/Search.svg"}
            alt="search"
            width={10}
            height={10}
          />
        </button>
      </Grid>
    </Grid.Container>
  );
};
