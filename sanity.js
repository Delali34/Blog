import { CreateCurrentUserHook, createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const dela = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",

  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(dela);
export const urlFor = (source) => createImageUrlBuilder(dela).image(source);
