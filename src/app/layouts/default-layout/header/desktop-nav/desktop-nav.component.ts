import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Route } from '@/core/constants/routes.constants';

@Component({
    selector: 'app-desktop-nav',
    standalone: true,
    imports: [RouterLink, CommonModule],
    template: `
        <nav class="pointer-events-auto">
            <ul class="flex gap-4">
                @for (item of navItems; track item.path) {
                    <li>
                        <a [routerLink]="item.path" class="text-primary">
                            {{ item.label }}
                        </a>
                    </li>
                }
            </ul>
        </nav>
    `,
})
export class DesktopNavComponent {
    @Input() navItems: Route[] = [];
}
