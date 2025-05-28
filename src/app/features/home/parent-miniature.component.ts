import { Component, Input } from '@angular/core';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { Parent } from '@/core/models/parent.model';

@Component({
    selector: 'app-parent-miniature',
    imports: [CloudinaryImageComponent, RouterLink],
    template: `
        <div class="card bg-base-100 shadow-xl">
            <figure class="size-full">
                <app-cloudinary-image
                    class="flex-center relative size-full"
                    [publicId]="parent.images[0].publicId"
                    i18n-alt="@@home.parents.alt"
                    alt="Parents bouledogue français"
                    [width]="450"
                    [height]="450"
                />
            </figure>

            <div class="card-body">
                <h3 class="card-title">{{ parent.name }}</h3>

                <p class="line-clamp-2 text-sm">{{ parent.description }}</p>

                <div class="card-actions justify-end">
                    <a
                        [routerLink]="[routes.parents.path, parent.id]"
                        class="btn btn-primary btn-sm"
                        i18n="@@home.parents.viewMore"
                    >
                        En savoir plus
                    </a>
                </div>
            </div>
        </div>
    `,
})
export class ParentMiniatureComponent {
    @Input() parent!: Parent;
    routes = routes;
}
