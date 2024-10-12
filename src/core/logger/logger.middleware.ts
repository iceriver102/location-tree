import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request, Response} from "express"
import { CustomLogger } from '.';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger){}

  use(req: Request, res: Response, next: Function) {
    res.on('finish', () => {
      this.logger.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
  }
}