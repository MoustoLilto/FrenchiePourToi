import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/layouts/default-layout/header/header.component';
import { FooterComponent } from '@/layouts/default-layout/footer/footer.component';

@Component({
    selector: 'app-default-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `
        <div class="bg-base-200 text-base-content flex h-full flex-col font-sans">
            <app-header />

            @if (isBrowser && scrollY > screenHeight) {
                <button
                    class="btn btn-circle btn-primary fixed bottom-3 right-3"
                    (click)="scrollToTop()"
                    aria-label="Retour en haut de la page"
                    title="Retour en haut"
                >
                    <i class="icon-[carbon--arrow-up]"></i>
                </button>
            }

            <main role="main" class="flex-auto">
                <div class="flex-center h-full w-full bg-red-500">
                    <h1>{{ scrollY }}</h1>
                </div>
                <router-outlet />
            </main>

            <app-footer />
        </div>
    `,
})
export class DefaultLayoutComponent {
    scrollY = 0;
    screenHeight = 0;
    isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.screenHeight = window.innerHeight;
            this.scrollY = window.scrollY;
        }
    }

    @HostListener('window:scroll')
    onScroll(): void {
        if (this.isBrowser) {
            this.scrollY = window.scrollY;
        }
    }

    scrollToTop(): void {
        if (this.isBrowser) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
