import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Route } from '@/core/constants/routes.constants';

@Component({
    selector: 'app-desktop-nav',
    standalone: true,
    imports: [RouterLink, CommonModule, RouterLinkActive],
    template: `
        <ul
            class="bg-base-200/80 text-base-content/80 rounded-selector shadow-base-content/5 ring-base-content/5 flex-center px-8 text-base font-medium shadow-lg ring-1 backdrop-blur"
        >
            @for (item of navItems; track item.path) {
                <li>
                    <a
                        [routerLink]="item.path"
                        class="hover:text-primary relative block text-nowrap px-3 py-2 transition"
                        routerLinkActive="text-primary"
                        [routerLinkActiveOptions]="{ exact: true }"
                        #rla="routerLinkActive"
                    >
                        {{ item.label }}

                        @if (rla.isActive) {
                            <div
                                class="bg-linear-to-r from-primary/0 via-primary/40 to-primary/0 absolute inset-x-1 -bottom-px h-[2px]"
                            ></div>
                        }
                    </a>
                </li>
            }
        </ul>
    `,
})
export class DesktopNavComponent {
    @Input() navItems: Route[] = [];
}
