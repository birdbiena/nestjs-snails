import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, map, throwError } from 'rxjs';

@Injectable()
export class HttpBaseService {
  constructor(private httpService: HttpService) {}

  get<T = any>(url: string, config: AxiosRequestConfig) {
    return this.httpService
      .get<T>(`${url}`, { ...config })
      .pipe(map((res) => res.data))
      .pipe(
        catchError((error: AxiosError) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.httpService
      .post<T>(`${url}`, data, {
        ...config,
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError((error: AxiosError) => {
          console.error(error);
          return throwError(() => error);
        })
      );
  }
}
