import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Route } from '@/core/constants/routes.constants';
import { SocialLinksComponent } from '@/shared/components/social-links.component';
@Component({
    selector: 'app-mobile-nav',
    imports: [RouterLink, CommonModule, RouterLinkActive, SocialLinksComponent],
    template: `
        <div class="dropdown dropdown-end pointer-events-auto">
            <div tabindex="0" role="button" class="flex-center">
                <span class="icon-[material-symbols--menu] text-xl"></span>
            </div>

            <div
                tabindex="0"
                class="dropdown-content card card-sm bg-base-200/80 shadow-base-content/5 ring-base-content/5 w-max overflow-hidden shadow-lg ring-1 backdrop-blur"
            >
                <div class="card-body" role="navigation">
                    <ul class="text-base">
                        @for (item of navItems; track item.path) {
                            <li>
                                <a
                                    [routerLink]="item.path"
                                    routerLinkActive="text-primary"
                                    class="hover:text-primary flex-between group/nav w-full text-nowrap py-2 transition"
                                    #rla="routerLinkActive"
                                >
                                    {{ item.label }}
                                    @if (rla.isActive) {
                                        <i class="icon-[carbon--arrow-left]"></i>
                                    } @else {
                                        <i
                                            class="icon-[carbon--arrow-up-right] group-hover/nav:icon-over-[carbon--arrow-right]"
                                        ></i>
                                    }
                                </a>
                            </li>
                        }
                    </ul>

                    <div class="border-1 border-base-content/20"></div>

                    <app-social-links
                        [withLabel]="false"
                        class="flex-center mt-2 gap-x-3 text-2xl font-semibold"
                        inputClass="text-lg"
                    />
                </div>
            </div>
        </div>
    `,
})
export class MobileNavComponent {
    @Input() navItems: Route[] = [];
}
