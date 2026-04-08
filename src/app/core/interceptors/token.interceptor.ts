import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    return next(req);
  }

  const clonedReq = req.clone({
    setHeaders: {
      token,
    },
  });

  return next(clonedReq);
};
