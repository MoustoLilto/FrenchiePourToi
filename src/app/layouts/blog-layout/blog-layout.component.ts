import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-blog-layout',
    imports: [RouterOutlet],
    template: `
        <div>
            <p>blog-layout works!</p>

            <router-outlet />
        </div>
    `,
})
export class BlogLayoutComponent {}
