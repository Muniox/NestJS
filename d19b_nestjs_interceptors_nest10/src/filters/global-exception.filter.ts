import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseError =
      exception instanceof HttpException
        ? exception.getResponse()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //możemy też tylko logować albo wyświeltać błąd w konsoli:
    console.log(exception);

    //Zmieniamy odpowiedz błędu ImATeapotException z domyślnej na:
    // w main dołączamy app.useGlobalFilters(new GlobalExceptionFilter());
    //GET http://localhost:3000/shop/test
    response.status(status).json({
      responseError,
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
