
// Removed reference to vite/client due to missing type definition.
// Use namespace augmentation to avoid redeclaring block-scoped 'process'.

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
