import { Injectable, NestMiddleware, Logger } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`)
  use(req: any, _res: any, next: () => void) {
    this.logger.verbose(
      `${req.method} ${req.ip} to ${
        req.originalUrl ?? req.baseUrl
      }`
    )
    next()
  }
}
