// Augment the global NodeJS namespace to include API_KEY in ProcessEnv.
// We avoid redeclaring 'process' to prevent conflicts with existing definitions (e.g. from @types/node).
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
