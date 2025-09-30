import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@app/shared/components/loader';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-home',
  imports: [Loader, MenuModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Home {
items: MenuItem[] | undefined;

    constructor(private router: Router) {}

       ngOnInit() {
        this.items = [
            {
                label: 'Navigate',
                items: [
                    {
                        label: 'Router Link',
                        icon: 'pi pi-palette',
                        routerLink: '/theming'
                    },
                    {
                        label: 'Programmatic',
                        icon: 'pi pi-link',
                        command: () => {
                            this.router.navigate(['/installation']);
                        }
                    },
                    {
                        label: 'External',
                        icon: 'pi pi-home',
                        url: 'https://angular.io//'
                    }
                ]
            }
        ];
    }
}
