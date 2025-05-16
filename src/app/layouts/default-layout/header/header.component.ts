import { Component, Signal, Inject, LOCALE_ID } from '@angular/core';
import { DarkModeService } from '@/core/services/dark-mode.service';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { CommonModule } from '@angular/common';
import { Language } from '@/core/constants/language.enum';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { SocialLinksComponent } from '@/shared/components/social-links.component';

@Component({
    selector: 'app-header',
    imports: [
        CloudinaryImageComponent,
        RouterLink,
        CommonModule,
        DesktopNavComponent,
        MobileNavComponent,
        SocialLinksComponent,
    ],
    template: `
        <header role="banner" class="bg-base-100/90 fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
            <div class="flex-between container pointer-events-none h-16 bg-red-100 px-4">
                <a [routerLink]="routes.home.path" class="pointer-events-auto flex">
                    <app-cloudinary-image
                        publicId="logo_l4z9mp"
                        [isPriority]="true"
                        [width]="60"
                        [height]="60"
                        alt="Logo"
                    />
                </a>

                <app-desktop-nav [navItems]="navItems" class="hidden bg-pink-400 md:block" />

                <div class="flex-end pointer-events-auto gap-6 text-2xl">
                    <app-social-links
                        [withLabel]="false"
                        class="hidden md:flex"
                        inputClass="text-lg"
                    />

                    <app-mobile-nav [navItems]="navItems" class="md:hidden" />

                    <label class="swap text-base">
                        <input
                            type="checkbox"
                            [checked]="currentLocale === Language.FR"
                            (change)="switchLanguage()"
                        />
                        <span class="swap-on">FR</span>
                        <span class="swap-off">EN</span>
                    </label>

                    <label class="swap swap-rotate text-lg">
                        <input type="checkbox" [checked]="isDark()" (change)="toggleDarkMode()" />
                        <span class="icon-[carbon--moon] swap-on"></span>
                        <span class="icon-[carbon--sun] swap-off"></span>
                    </label>
                </div>
            </div>
        </header>
    `,
})
export class HeaderComponent {
    isDark: Signal<boolean>;
    routes = routes;
    navItems = Object.values(routes).filter((route) => route.path !== routes.home.path);
    currentLocale: string;
    Language = Language;

    constructor(
        private darkModeService: DarkModeService,
        @Inject(LOCALE_ID) localeId: string
    ) {
        this.isDark = this.darkModeService.isDark;
        this.currentLocale = localeId;
    }

    toggleDarkMode() {
        this.darkModeService.toggleDark();
    }

    switchLanguage() {
        const targetLocale = this.currentLocale === Language.FR ? Language.EN : Language.FR;
        const currentPath = window.location.pathname;
        let newPath: string;

        const localePattern = /^\/(fr|en)/;
        if (localePattern.test(currentPath)) {
            newPath = currentPath.replace(localePattern, `/${targetLocale}`);
        } else {
            newPath = `/${targetLocale}${currentPath === '/' ? '' : currentPath}`;
        }

        window.location.href = newPath;
    }
}
