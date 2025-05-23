import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollListenerDirective } from '@/shared/directives/scroll-listener.directive';
import { HeaderComponent } from '~/app/layouts/header/header.component';
import { FooterComponent } from '~/app/layouts/footer/footer.component';
import { ScrollToTopButtonComponent } from '@/shared/components/scroll-to-top-button/scroll-to-top-button.component';

@Component({
    selector: 'app-default-layout',
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        ScrollToTopButtonComponent,
        ScrollListenerDirective,
    ],
    template: `
        <div
            appScrollListener
            #scrollListener="scrollListener"
            class="bg-base-200 text-base-content flex h-full flex-col font-sans"
        >
            <app-header />

            <main role="main" class="h-full flex-auto py-16">
                <router-outlet />
            </main>

            @if (scrollListener.hasExceededScreenHeight()) {
                <app-scroll-to-top-button />
            }

            <app-footer />
        </div>
    `,
})
export class DefaultLayoutComponent {}
