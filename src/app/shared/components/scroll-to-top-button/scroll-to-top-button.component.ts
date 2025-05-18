import { Component } from '@angular/core';

@Component({
    selector: 'app-scroll-to-top-button',
    template: `
        <button
            class="btn btn-circle btn-primary fixed bottom-3 right-3 z-50"
            (click)="scrollToTop()"
            i18n-aria-label="@@scroll-to-top-button.aria-label"
            aria-label="Retour en haut de la page"
            i18n-title="@@scroll-to-top-button.title"
            title="Retour en haut"
        >
            <i class="icon-[carbon--arrow-up]"></i>
        </button>
    `,
})
export class ScrollToTopButtonComponent {
    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
