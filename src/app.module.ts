import {
  Module,
  MiddlewareConsumer,
  NestModule
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { HashModule } from './hash/hash.module'
import { Env } from './entities'
import { JwtModule } from '@nestjs/jwt'
import { LoggerMiddleware } from './logger.middleware'
import { StoreModule } from './store/store.module'
import { ProductModule } from './product/product.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService<Env>) => ({
          privateKey: configService.get('JWT_PRIVATE_KEY'),
          publicKey: configService.get('JWT_PUBLIC_KEY'),
          signOptions: {
            expiresIn: '12w',
            algorithm: 'RS512'
          },
          verifyOptions: {
            ignoreExpiration: false,
            algorithms: ['RS512']
          }
        }),
        inject: [ConfigService]
      }),
      global: true
    },
    UserModule,
    PrismaModule,
    AuthModule,
    HashModule,
    StoreModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
