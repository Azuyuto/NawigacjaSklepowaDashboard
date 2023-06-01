import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  email?: string;

  constructor(private storageService: StorageService, private authService: AuthService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.email = user.email;
    }
  }

  logout(): void {
    console.log(456);
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
