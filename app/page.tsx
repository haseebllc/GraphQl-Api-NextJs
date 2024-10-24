"use client";

import { gql, useQuery } from "@apollo/client";
import client from "./apollo/apolloClient";
import classNames from "classnames";

import "bootstrap/dist/css/bootstrap.min.css";

interface Character {
  id: string;
  name: string;
}

const GET_CHARACTERS = gql`
  query {
    characters(page: 1, limit: 20) {
      total
      pages
      characters {
        id
        name
      }
    }
    episodes(page: 1, limit: 20) {
      total
      pages
      episodes {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CHARACTERS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className={classNames(
        "container  bg-light px-4 py-4  d-flex mt-4 border border-dark"
      )}
    >
      <div>
        <h1 className={classNames("text-capitalize fs-2 py-3")}>
          Character List
        </h1>
        <ul className={classNames("m-0 p-0")}>
          {data.characters.characters.map((character: Character) => (
            <li key={character.id} className={classNames("pb-1")}>
              Character - {character.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className={classNames("text-capitalize fs-2 py-3")}>
          Episodes List
        </h1>
        <ul className={classNames("m-0 p-0")}>
          {data.episodes.episodes.map((episode: Character) => (
            <li key={episode.id} className={classNames("pb-1")}>
              episode - {episode.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
