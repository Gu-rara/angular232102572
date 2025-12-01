import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const otentikasiGuard: CanActivateFn = (route, state) => {
  console.log('Otentikasi guard activated');

  var userId = Inject(CookieService).get('userId');
  console.log('User ID from cookie:', userId);

  if (!userId) {
    //anggap belum login
  }
  else if (userId === 'undefined') {
    //anggap belum login
  }
  else if (userId === '') {
    //anggap belum login
  }
  else {
    //anggap sudah login
    return true;
  }

  Inject(Router).navigate(['/login']);
  return false;
};
