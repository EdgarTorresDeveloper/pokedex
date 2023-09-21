"use client";
import { useEffect, useState } from "react";
import { Searcher } from "../global/searcher/Searcher";
import LayoutCards from "../global/layout/LayoutCards";
import dynamic from "next/dynamic";
import { Pokemon } from "@/app/interfaces/pokemons";
import { pagePaginationType } from "@/app/interfaces/pagination";
import Pagination from "../global/pagination/Pagination";

const LoadingScreen = dynamic(() => import("../global/LoadingScreen"));

const Dashboard = () => {
  //---------- Hooks to save data ----------
  const [pagePagination, setPagePagination] = useState<pagePaginationType>({
    searchQuery: null,
    limit: 12,
    offset: 0,
  });

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<Pokemon[]>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    //Get data
    setLoading(true);
    getData(pagePagination.offset, pagePagination.limit, null);
    setLoading(false);
  }, []);

  const getData = async (
    offset: number,
    limit: number,
    search: string | null
  ) => {
    setLoading(true);
    try {
      let url;
      let flagError = false;
      if (search && search.length > 0)
        url = `https://pokeapi.co/api/v2/pokemon/${search}`;
      else
        url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

      let res = await fetch(url);
      if (res?.status == 404) {
        url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
        res = await fetch(url);
        flagError = true;
      }
      const entries = await res.json();

      let list: Pokemon[] = [];
      if (search && search.length > 0 && entries && !flagError) {
        let listAbilities: any = [];
        entries?.types?.map((itemAbility: any) => {
          listAbilities.push({
            name: itemAbility.type.name,
          });
        });
        list.push({
          id: entries.id,
          name: entries.name,
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${entries.id}.png`,
          abilities: listAbilities,
        });
      }

      if (!search || search.length == 0 || flagError)
        for await (const item of entries?.results) {
          const urlDetails = item.url;
          if (urlDetails) {
            const resDetails = await fetch(urlDetails);
            const entriesDetails = await resDetails.json();
            console.log("entriesDetails: ",entriesDetails)

            if (entriesDetails) {
              let listAbilities: any = [];
              entriesDetails?.types?.map((itemAbility: any) => {
                listAbilities.push({
                  name: itemAbility.type.name,
                });
              });

              list.push({
                id: entriesDetails.id,
                name: entriesDetails.name,
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${entriesDetails.id}.png`,
                abilities: listAbilities,
              });
            }
          }
        }

      setData(list);
      setTotal(entries?.count ? entries.count : 0);
      setLoading(false);
    } catch (error) {
      setData([]);
      setTotal(0);
      setLoading(false);
    }
  };

  const handleChangePagination = (selectedItem: { selected: number }) => {
    if (setPagePagination && pagePagination)
      setPagePagination({
        ...pagePagination,
        offset: selectedItem.selected * pagePagination.limit,
      });
    getData(
      selectedItem.selected * pagePagination.limit,
      pagePagination.limit,
      null
    );
  };

  const handleClick = (search: string) => {
    getData(
      pagePagination.offset,
      pagePagination.limit,
      search.toLowerCase().trim()
    );
  };

  return (
    <div>
      {!loading ? (
        <div className="dashboard">
          <Searcher handleClick={handleClick} />
          <LayoutCards data={data} />
        </div>
      ) : (
        <>
          <LoadingScreen />
        </>
      )}
      <Pagination
        onPageChange={handleChangePagination}
        pageCount={Math.ceil((1 * total ? total : 0) / pagePagination.limit)}
      />
    </div>
  );
};

// export async function getServerSideProps(){
//   const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
//   const res = await fetch(url)
//   const entries = await res.json()

//   return {
//     props: {
//       entries,
//     }
//   }
// }

export default Dashboard;
