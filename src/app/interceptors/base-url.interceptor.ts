import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const serverUrl = isDevMode()
  ? 'http://127.0.0.1:8000/api'
  : 'http://127.0.0.1:8000/api';

const clonedReq = req.clone({
  url: `${serverUrl}/${req.url}`
})
  return next(clonedReq);
};
