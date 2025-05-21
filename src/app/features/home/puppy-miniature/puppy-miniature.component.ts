import { Component, Input } from '@angular/core';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { Puppy } from '@/core/models/puppy.model';

@Component({
    selector: 'app-puppy-miniature',
    imports: [CloudinaryImageComponent, RouterLink],
    template: `
        <div class="card bg-base-100 shadow-xl">
            <figure class="size-full">
                <app-cloudinary-image
                    class="flex-center relative size-full"
                    [publicId]="puppy.images[0].publicId"
                    i18n-alt="@@home.puppies.alt"
                    alt="Chiots bouledogue français"
                    [width]="450"
                    [height]="450"
                />
            </figure>

            <div class="card-body">
                <h3 class="card-title">{{ puppy.name }}</h3>
                <p>
                    {{ puppy.description }}
                </p>
                <div class="card-actions justify-end">
                    <a
                        [routerLink]="[routes.puppies.path, puppy.id]"
                        class="btn btn-primary btn-sm"
                        i18n="@@home.puppies.viewMore"
                    >
                        En savoir plus
                    </a>
                </div>
            </div>
        </div>
    `,
})
export class PuppyMiniatureComponent {
    @Input() puppy!: Puppy;
    routes = routes;
}
