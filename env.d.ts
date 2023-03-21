declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string
    PORT: string
    NODE_ENV: 'development' | 'production' | 'test'
    DEBUG: 'true' | 'false'
    DEV_DATABASE_URL: string
    TEST_DATABASE_URL: string
    JWT_PUBLIC_KEY: string
    JWT_PRIVATE_KEY: string
  }
}
