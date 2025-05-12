import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/layouts/default-layout/header/header.component';
import { FooterComponent } from '@/layouts/default-layout/footer/footer.component';
@Component({
    selector: 'app-default-layout',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {}
