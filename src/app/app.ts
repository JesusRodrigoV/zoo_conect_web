import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './core/store/auth.store';
import { isPlatformBrowser } from '@angular/common';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScrollTopModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'zoo-connect-web';
  private readonly authStore = inject(AuthStore);
  private id = inject(PLATFORM_ID);

  async ngOnInit() {
    if (isPlatformBrowser(this.id)) {
      await this.authStore.initializeAuth();
    }
  }
}
