// / <reference types="vite/client" s

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITE_APPWRITE_PROJECT_ID: string;
  readonly VITE_APPWRITE_DATABASE_ID: string;
  readonly VITE_APPWRITE_COLLECTION_ID: string;
  // Add other env variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

