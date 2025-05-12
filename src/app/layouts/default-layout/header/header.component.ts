import { Component, Signal, Inject, LOCALE_ID } from '@angular/core';
import { DarkModeService } from '@/core/services/dark-mode.service';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { CommonModule } from '@angular/common';
import { Language } from '@/core/constants/language.enum';
import { DesktopNavComponent } from './desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';

@Component({
    selector: 'app-header',
    imports: [
        CloudinaryImageComponent,
        RouterLink,
        CommonModule,
        DesktopNavComponent,
        MobileNavComponent,
    ],
    templateUrl: './header.component.html',
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
