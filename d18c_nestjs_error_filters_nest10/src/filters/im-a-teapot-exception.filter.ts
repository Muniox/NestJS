import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ImATeapotException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ImATeapotException)
export class ImATeapotExceptionFilter implements ExceptionFilter {
  catch(exception: ImATeapotException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //możemy też tylko logować albo wyświeltać błąd w konsoli:
    // console.log(exception);

    //Zmieniamy odpowiedz błędu ImATeapotException z domyślnej na:
    // w main dołączamy app.useGlobalFilters(new ImATeapotExceptionFilter());
    //GET http://localhost:3000/shop/test
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
