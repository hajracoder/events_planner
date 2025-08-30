// appwrite.ts
import { Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1") // aapka endpoint
    .setProject("68ad3635002b6b07ea8c"); // aapka project ID

export const databases = new Databases(client);
export const DATABASE_ID = "68ade7fc000132803e3e";
export const COLLECTION_ID_EVENTS = "686e61d8002e1048f8d3";


