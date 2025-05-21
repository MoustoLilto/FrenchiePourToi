import { Component, Input } from '@angular/core';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { Testimonial } from '@/core/models/testimonial.model';

@Component({
    selector: 'app-testimonial-miniature',
    imports: [CloudinaryImageComponent],
    template: `
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="mb-2 flex">
                    @for (i of testimonial.rating; track i) {
                        <i class="icon-[carbon--star-filled] text-warning"></i>
                    }
                </div>

                <p class="mb-4 italic">"{{ testimonial.description }}"</p>

                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <app-cloudinary-image
                                class="relative size-full"
                                inputClass="size-12 object-top"
                                publicId="IMG_0460_f8onkt"
                                i18n-alt="@@home.puppies.alt"
                                [width]="48"
                                [height]="48"
                                alt="Chiot bouledogue français"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 class="font-bold">{{ testimonial.name }}</h3>
                        <p class="text-sm">Propriétaire depuis {{ testimonial.ownerSince }}</p>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class TestimonialMiniatureComponent {
    @Input() testimonial!: Testimonial;
}
