import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/layouts/default-layout/header/header.component';
import { FooterComponent } from '@/layouts/default-layout/footer/footer.component';
@Component({
    selector: 'app-default-layout',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `
        <div class="bg-base-200 text-base-content flex h-full flex-col font-sans">
            <app-header />

            <main role="main" class="flex-auto">
                <router-outlet />
            </main>

            <app-footer />
        </div>
    `,
})
export class DefaultLayoutComponent {}
