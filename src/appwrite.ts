
// import { Client, Account, Databases,ID } from "appwrite";

// const client = new Client()
//     .setEndpoint("https://fra.cloud.appwrite.io/v1") // aapka endpoint
//     .setProject("68ad3635002b6b07ea8c"); // aapka project ID

// export const databases = new Databases(client);
// export const DATABASE_ID = "68ade7fc000132803e3e";
// export const COLLECTION_ID_EVENTS = "Event2025_09_01";
// export const COLLECTION_ID_MAIN_EVENT = "main_event1_9_25";
// export const COLLECTION_ID_LOCATIONS = "locations_1_9_25";
// export const COLLECTION_ID_USERS= "users_01_9_25";
//  export const account = new Account(client); 
//  export { ID };














import { Client, Account, Databases, ID } from "appwrite";

export const client = new Client() // <-- yahan export lagana hai
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // aapka endpoint
  .setProject("68ad3635002b6b07ea8c"); // aapka project ID

export const databases = new Databases(client);

export const DATABASE_ID = "68ade7fc000132803e3e";
export const COLLECTION_ID_EVENTS = "Event2025_09_01";
export const COLLECTION_ID_MAIN_EVENT = "main_event1_9_25";
export const COLLECTION_ID_LOCATIONS = "locations_1_9_25";
export const COLLECTION_ID_USERS = "users_01_9_25";

export const account = new Account(client);
export { ID };








