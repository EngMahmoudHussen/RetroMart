import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastr: ToastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      console.log(err);
      _toastr.error(
        err.error.message,

        'Hii!',
      );
      return throwError(err);
    }),
  );
};
