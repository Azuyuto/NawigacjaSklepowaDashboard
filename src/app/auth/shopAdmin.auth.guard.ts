import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShopAdminAuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.storageService.IsLoggedInAsShopAdmin()) {
      alert('Nie możesz posiadać dwóch sklepów przypisanych do jednego konta.');
      this.router.navigate(['']);
      return false;
    }

    return true;
  }  
}
