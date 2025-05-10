import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { provideCloudinaryLoader } from '@angular/common';
import { environment } from '~/environments/environment';

@Component({
    selector: 'app-cloudinary-image',
    template: `
        <img
            *ngIf="publicId"
            [alt]="alt"
            [ngSrc]="publicId"
            [placeholder]="withPlaceholder"
            [priority]="isPriority"
            [class]="inputClass"
            [fill]="isFilled"
            [width]="width"
            [height]="height"
            [sizes]="sizes"
        />
    `,
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    providers: [
        provideCloudinaryLoader(
            `${environment.cloudinary.cloudUrl}/${environment.cloudinary.cloudName}`
        ),
    ],
})
export class CloudinaryImageComponent {
    @Input() publicId!: string;
    @Input() alt = '';
    @Input() inputClass = '';
    @Input() isPriority = false;
    @Input() withPlaceholder = false;

    // Lorsque l'image est statique
    @Input() width: number | null = null;
    @Input() height: number | null = null;
    @Input() sizes?: string; // '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw';

    // Lorsque l'image est dynamique
    @Input() isFilled?: boolean;

    constructor() {
        if (this.width && this.height) {
            this.isFilled = false;
        }
    }
}
