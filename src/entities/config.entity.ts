import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

export class Env {
  HOST!: string
  PORT!: string
  NODE_ENV!: 'development' | 'production' | 'test'
  DEBUG!: 'true' | 'false'

  DEV_DATABASE_URL!: string
  TEST_DATABASE_URL!: string
  PROD_DATABASE_URL!: string
  JWT_SECRET!: string
  JWT_PUBLIC_KEY!: string
  JWT_PRIVATE_KEY!: string

  constructor() {
    Object.assign(this, process.env)
  }
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Env, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
