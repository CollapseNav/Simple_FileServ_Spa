/*
 * @Author: CollapseNav
 * @Date: 2020-01-08 16:50:42
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:27:42
 * @Description:
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snack: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        switch (error.status) {
          case 401: {
            this.router.navigate(['index']);
            this.snack.open('未认证用户信息，请登录');
            break;
          }
          default: {
            console.log(error);
            this.snack.open('未知错误', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        }
        // 当发生401错误的时候重新登陆获取新的token
        if (error.status == 401) {
          this.router.navigate(['index']);
        }
        return of(error);
      })
    );
  }
}
