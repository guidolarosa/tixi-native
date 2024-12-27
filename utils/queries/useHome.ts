import { useQuery } from "react-query";
import client from "./../sanity/client";
import { HomeType } from "@/types";
import groq from "groq";

const fetchEvents = async () => {
  const query = groq`*[_type == "home"][0] {
  artist_of_the_month->{
    bio,
    spotify,
    instagram,
    name,
    "image": image.asset->url,
    slug
  },
  featuredEvents[]->{
    ...,
    "mainImage": mainImage.asset->url,
  }}`; // Adjust to your Sanity query to fetch events
  const home: HomeType = await client.fetch(query);
  return home;
};

const useHome = () => {
  return useQuery("home", fetchEvents);
};

export default useHome;
