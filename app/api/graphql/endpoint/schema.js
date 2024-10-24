// app/api/graphql/schema.js
import { gql } from "apollo-server-micro";

// Define your GraphQL schema
export const typeDefs = gql`
  type Query {
    hello: String
    characters(page: Int!, limit: Int!): CharacterPage!
    episodes(page: Int!, limit: Int!): EpisodePage!
    character(id: ID!): Character
    episode(id: ID!): Episode
  }

  type Character {
    id: ID!
    name: String!
  }

  type Episode {
    id: ID!
    name: String!
  }

  type CharacterPage {
    total: Int!
    pages: Int!
    characters: [Character!]!
  }

  type EpisodePage {
    total: Int!
    pages: Int!
    episodes: [Episode!]!
  }

  input CreateCharacterInput {
    name: String!
  }

  input UpdateCharacterInput {
    id: ID!
    name: String!
  }

  type Mutation {
    createCharacter(input: CreateCharacterInput!): Character!
    updateCharacter(input: UpdateCharacterInput!): Character!
    deleteCharacter(id: ID!): Boolean!
  }
`;

// GraphQL API resolvers in Query & Mutation
export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    characters: (_, { page, limit }) => {
      const total = characters.length;
      const pages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedCharacters = characters.slice(start, end);
      return {
        total,
        pages,
        characters: paginatedCharacters,
      };
    },
    episodes: (_, { page, limit }) => {
      const total = episodes.length;
      const pages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedEpisodes = episodes.slice(start, end);
      return {
        total,
        pages,
        episodes: paginatedEpisodes,
      };
    },
    character: (_, { id }) => {
      const character = characters.find((c) => c.id === id);
      if (!character) throw new Error("Character not found");
      return character;
    },
    episode: (_, { id }) => {
      const episode = episodes.find((e) => e.id === id);
      if (!episode) throw new Error("Episode not found");
      return episode;
    },
  },
  Mutation: {
    createCharacter: (_, { input }) => {
      const newCharacter = {
        id: String(characters.length + 1),
        ...input,
      };
      characters.push(newCharacter);
      return newCharacter;
    },
    updateCharacter: (_, { input }) => {
      const index = characters.findIndex((c) => c.id === input.id);
      if (index === -1) throw new Error("Character not found");
      characters[index] = { ...characters[index], ...input };
      return characters[index];
    },
    deleteCharacter: (_, { id }) => {
      const index = characters.findIndex((c) => c.id === id);
      if (index === -1) throw new Error("Character not found");
      characters.splice(index, 1);
      return true;
    },
  },
};

// Sample data for characters and episodes
const characters = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Max Thompson" },
  { id: "3", name: "Sofia Garcia" },
  { id: "4", name: "Liam Brown" },
  { id: "5", name: "Emma Williams" },
  { id: "6", name: "Noah Martinez" },
  { id: "7", name: "Olivia Lee" },
  { id: "8", name: "James Wilson" },
  { id: "9", name: "Mia Anderson" },
  { id: "10", name: "Lucas Taylor" },
  { id: "11", name: "Charlotte Thomas" },
  { id: "12", name: "Ethan White" },
  { id: "13", name: "Ava Harris" },
  { id: "14", name: "Isabella Clark" },
  { id: "15", name: "Oliver Robinson" },
  { id: "16", name: "Sophia Walker" },
  { id: "17", name: "Jackson Hall" },
  { id: "18", name: "Amelia Allen" },
  { id: "19", name: "Carter Young" },
  { id: "20", name: "Harper King" },
];
const episodes = [
  { id: "1", name: "The Mysterious Forest" },
  { id: "2", name: "Journey Through the Stars" },
  { id: "3", name: "Secrets of the Ancient Ruins" },
  { id: "4", name: "The Lost City of Gold" },
  { id: "5", name: "Echoes of the Past" },
  { id: "6", name: "A Day in the Life of Heroes" },
  { id: "7", name: "The Quest for the Crystal" },
  { id: "8", name: "Into the Abyss" },
  { id: "9", name: "Rise of the Guardians" },
  { id: "10", name: "The Enchanted Kingdom" },
  { id: "11", name: "The Great Escape" },
  { id: "12", name: "Whispers in the Wind" },
  { id: "13", name: "The Final Showdown" },
  { id: "14", name: "The Last Stand" },
  { id: "15", name: "Battlegrounds of Destiny" },
  { id: "16", name: "Tides of Change" },
  { id: "17", name: "The Prophecy Unfolds" },
  { id: "18", name: "Crossroads of Fate" },
  { id: "19", name: "Shadows of the Past" },
  { id: "20", name: "Dawn of a New Era" },
];
