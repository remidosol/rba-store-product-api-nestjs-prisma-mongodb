import { NestFactory, NestApplication } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ValidationPipe, Logger } from '@nestjs/common'
import { globalPrefix } from './app.constants'
import { ConfigService } from '@nestjs/config'
import { Env } from './entities'
import helmet from 'helmet'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      logger: ['log', 'debug', 'error', 'warn', 'verbose']
    }
  )

  const configService = app.get(ConfigService<Env>)
  const logService = new Logger(NestApplication.name)

  app.use(helmet())
  app.set('trust proxy', true)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.setGlobalPrefix(globalPrefix)

  const swaggerConf = new DocumentBuilder()
    .setTitle('Store-Product API with RBA')
    .setDescription(
      `An experimental NestJS project that contains role-based access control system with Prisma, Jest and TypeScript. The project includes unit and integration tests.`
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConf)
  SwaggerModule.setup('api', app, document)

  await app.listen(configService.getOrThrow('PORT'))

  logService.log(
    `Application is running on: http://${
      configService.getOrThrow('HOST') +
      ':' +
      configService.getOrThrow('PORT')
    }`
  )

  logService.log(
    `Swagger is running on: http://${
      configService.getOrThrow('HOST') +
      ':' +
      configService.getOrThrow('PORT') +
      '/api'
    }`
  )
}

bootstrap()
