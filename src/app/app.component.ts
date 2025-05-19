import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <div class="flex h-full min-h-screen flex-col">
            <router-outlet class="grow" />
        </div>
    `,
})
export class AppComponent {}
