// appwrite.ts
import { Client, Account, Databases,ID } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1") // aapka endpoint
    .setProject("68ad3635002b6b07ea8c"); // aapka project ID

export const databases = new Databases(client);
export const DATABASE_ID = "68ade7fc000132803e3e";
export const COLLECTION_ID_EVENTS = "686e61d8002e1048f8d3";
 export const account = new Account(client); 
 export { ID };

// // src/appwrite.ts
// import { Client, Account, Databases } from "appwrite";

// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your endpoint
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

// export const account = new Account(client);  // yahan se account export karna zaroori hai
// export const databases = new Databases(client);

