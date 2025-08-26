import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!) // your endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!); // your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID }; // 👈 Export ID too
export default client;
