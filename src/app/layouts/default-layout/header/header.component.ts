import { Component, Signal, Inject, LOCALE_ID, signal } from '@angular/core';
import { DarkModeService } from '@/core/services/dark-mode.service';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [CloudinaryImageComponent, RouterLink, CommonModule],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    isDark: Signal<boolean>;
    routes = routes;
    navItems = Object.values(routes).filter((route) => route.path !== '/');
    currentLocale: string;

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
        const targetLocale = this.currentLocale === 'fr' ? 'en' : 'fr';
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
