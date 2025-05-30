import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { SocialLinksComponent } from '@/shared/components/social-links.component';
import { address } from '@/core/constants/address.constants';

@Component({
    selector: 'app-footer',
    imports: [SocialLinksComponent, RouterLink, RouterLinkActive],
    template: `
        <footer class="bg-primary/10 py-8">
            <div class="container px-4">
                <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div class="flex flex-col items-start justify-start gap-4">
                        <h3 class="font-serif text-xl font-bold">Frenchie Pour Toi</h3>

                        <p i18n="@@footer.description">
                            Élevage de bouledogues français de qualité. Nos chiots sont élevés avec
                            amour et attention pour devenir vos fidèles compagnons.
                        </p>

                        <app-social-links
                            [withLabel]="false"
                            class="flex-start gap-3"
                            inputClass="text-lg"
                        />
                    </div>

                    <div class="flex flex-col gap-4">
                        <h3 class="font-serif text-xl font-bold" i18n="@@footer.links">
                            Liens rapides
                        </h3>

                        <ul class="space-y-2" role="navigation">
                            @for (item of navItems; track item.path) {
                                <li>
                                    <a
                                        [routerLink]="item.path"
                                        class="hover:text-primary"
                                        routerLinkActive="text-primary"
                                        [routerLinkActiveOptions]="{ exact: true }"
                                    >
                                        {{ item.label }}
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>

                    <div class="flex flex-col items-start justify-start gap-2">
                        <h3 class="mb-2 font-serif text-xl font-bold" i18n="@@footer.contact">
                            Contact
                        </h3>

                        <p class="flex-start gap-2">
                            <i class="icon-[carbon--location]"></i>
                            <a
                                [href]="mapLink(address.address)"
                                target="_blank"
                                rel="noopener"
                                class="hover:underline"
                            >
                                {{ address.address }}
                            </a>
                        </p>

                        <p class="flex-start gap-2">
                            <i class="icon-[carbon--phone]"></i>
                            <a [href]="'tel:' + address.phone" class="hover:underline">
                                {{ address.phone }}
                            </a>
                        </p>

                        <p class="flex-start gap-2">
                            <i class="icon-[carbon--email]"></i>
                            <a [href]="'mailto:' + address.email" class="hover:underline">
                                {{ address.email }}
                            </a>
                        </p>
                    </div>
                </div>

                <div class="border-base-300 mt-8 border-t pt-8 text-center">
                    <p class="caption-text" i18n="@@footer.copyright">
                        ©2025 Frenchie Pour Toi. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    `,
})
export class FooterComponent {
    navItems = Object.values(routes);
    address = address;

    mapLink(addr: string): string {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
    }
}
