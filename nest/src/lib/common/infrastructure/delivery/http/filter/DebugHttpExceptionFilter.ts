import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { trim } from 'lodash';

@Catch()
export class DebugHttpExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = error instanceof HttpException ? error.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      message: error.message,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').map(trim),
      },
    });
  }
}
