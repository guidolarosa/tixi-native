import { ReactNode } from "react";
import { BlockDefinition, Slug, TypedObject } from "sanity";

export interface FormData {
  id: string;
  tickets: TicketType[];
}

export interface TicketType {
  _rev: string;
  _id: string;
  quantity: number;
  name: string;
  price: number;
}

export interface VenueType {
  _id: string;
  name: string;
  street: string;
  number: number;
}

export interface EventCategory {
  name: string;
}

export interface EventType {
  _id: string;
  tickets: TicketType[];
  title: string;
  mainImage: string;
  posterImage: string;
  new: boolean;
  available_tickets: number;
  slug: Slug;
  date: string;
  venue: VenueType;
  eventType: EventCategory;
  artists: ArtistType[];
  description: string;
  messages: MessageType[];
  dates: string[];
}

export interface PurchaseContextType {
  purchase: PurchaseType;
  setPurchase: (purchase: PurchaseType) => void;
}

export interface PurchaseType {
  _id?: string;
  _createdAt?: string;
  name?: string;
  items: CartItemType[];
}

export interface CartItemType {
  _key: string;
  event: EventType;
  tickets: TicketType[];
}

export interface ArtistType {
  _id: string;
  image: string;
  name: string;
  slug: Slug;
  bio: TypedObject;
}

export interface MessageType {
  authorName: string;
  message: string;
}

export interface TabType {
  name: string;
  children: ReactNode;
}

export interface HomeType {
  artist_of_the_month: {
    image: string;
    name: string;
    instagram: string;
    spotify: string;
    bio: TypedObject;
    slug: Slug;
  };
  featuredEvents: EventType[];
}
