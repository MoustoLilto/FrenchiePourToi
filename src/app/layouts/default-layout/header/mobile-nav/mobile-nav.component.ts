import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Route } from '@/core/constants/routes.constants';

@Component({
    selector: 'app-mobile-nav',
    standalone: true,
    imports: [RouterLink, CommonModule],
    template: `
        <div class="dropdown dropdown-end pointer-events-auto">
            <div tabindex="0" role="button" class="btn btn-ghost">
                <span class="icon-[material-symbols--menu] text-xl"></span>
            </div>

            <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                @for (item of navItems; track item.path) {
                    <li>
                        <a [routerLink]="item.path">
                            {{ item.label }}
                        </a>
                    </li>
                }
            </ul>
        </div>
    `,
})
export class MobileNavComponent {
    @Input() navItems: Route[] = [];
}
