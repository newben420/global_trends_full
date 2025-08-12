import { HttpInterceptorFn } from '@angular/common/http';
import { timeout } from 'rxjs';

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  let timeoutVal: number = 30000;
  if(req.body instanceof FormData){
    timeoutVal = 1800000;
  }
  let newReq = req.clone({setHeaders:{timeout: `${timeoutVal}`}});
  return next(newReq).pipe(timeout(timeoutVal));
};
