import {
  Injectable,
  INestApplication,
  OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Prisma, PrismaClient } from '@prisma/client'
import { Env } from '../entities'

/**
 * #### Business layer for `prisma` module
 *
 * @class PrismaService
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  constructor(private configService: ConfigService<Env>) {
    super({
      datasources: {
        db: {
          url:
            configService.getOrThrow('NODE_ENV') === 'development'
              ? configService.getOrThrow('DEV_DATABASE_URL')
              : configService.getOrThrow('NODE_ENV') === 'test'
              ? configService.getOrThrow('TEST_DATABASE_URL')
              : configService.getOrThrow('PROD_DATABASE_URL')
        }
      },
      log:
        configService.getOrThrow('DEBUG') === 'true' ||
        configService.getOrThrow('DEBUG') === true
          ? ['error', 'info', 'query', 'warn']
          : [],
      errorFormat:
        configService.getOrThrow('NODE_ENV') === 'development'
          ? 'pretty'
          : 'minimal'
    } as Prisma.PrismaClientOptions)
  }

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
