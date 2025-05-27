import { Component, Input, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Parent } from '@/core/models/parent.model';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { routes } from '@/core/constants/routes.constants';

@Component({
    selector: 'app-parent-card',
    standalone: true,
    imports: [CommonModule, CloudinaryImageComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            class="card bg-base-100 border-base-content/10 shadow-base-content/10 group w-full max-w-sm border shadow-lg"
        >
            <figure class="relative w-full">
                @if (parent().images && parent().images.length > 0) {
                    <app-cloudinary-image
                        [publicId]="mainImage().publicId"
                        [alt]="mainImage().alt"
                        [width]="384"
                        [height]="300"
                        class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                } @else {
                    <div
                        class="bg-base-200 flex aspect-[3/2] w-full items-center justify-center rounded-t-lg"
                    >
                        <span class="text-base-content/50">Aucune image</span>
                    </div>
                }

                <div
                    class="bg-neutral/10 group-hover:bg-base-content/5 absolute inset-0 flex justify-end p-2"
                ></div>

                <!-- Badge de statut -->
                <div class="absolute left-3 top-3">
                    @if (parent().status === 'active') {
                        <div class="badge badge-success badge-sm">
                            <span i18n="@@parents.status.active">Actif</span>
                        </div>
                    } @else {
                        <div class="badge badge-neutral badge-sm">
                            <span i18n="@@parents.status.retired">Retraité</span>
                        </div>
                    }
                </div>

                <!-- Badge de genre -->
                <div class="absolute right-3 top-3">
                    @if (parent().gender === 'male') {
                        <div class="badge badge-info badge-sm">
                            <i class="icon-[carbon--user] mr-1"></i>
                            <span i18n="@@parents.gender.male">Mâle</span>
                        </div>
                    } @else {
                        <div class="badge badge-secondary badge-sm">
                            <i class="icon-[carbon--user] mr-1"></i>
                            <span i18n="@@parents.gender.female">Femelle</span>
                        </div>
                    }
                </div>
            </figure>

            <div class="card-body">
                <h3 class="card-title text-base-content line-clamp-1 text-xl font-bold">
                    {{ parent().name }}
                </h3>

                <div class="my-2 flex flex-wrap gap-2">
                    <div class="badge badge-outline badge-sm max-w-30 truncate">
                        <i class="icon-[carbon--scale] mr-1"></i>
                        {{ parent().weight }}
                        <span i18n="@@parents.weight.kg">kg</span>
                    </div>

                    <div class="badge badge-outline badge-sm max-w-30 truncate">
                        <i class="icon-[carbon--calendar] mr-1"></i>
                        {{ getAge() }}
                        <span i18n="@@parents.age.years">ans</span>
                    </div>

                    @if (parent().pedigree.registration) {
                        <div class="badge badge-outline badge-sm max-w-30 truncate">
                            <i class="icon-[carbon--certificate] mr-1"></i>
                            {{ parent().pedigree.registration }}
                        </div>
                    } @else {
                        <div class="badge badge-outline badge-sm max-w-30 truncate">
                            <i class="icon-[carbon--color-palette] mr-1"></i>
                            {{ parent().color }}
                        </div>
                    }
                </div>

                <div class="mb-4 flex flex-col gap-3">
                    <p class="text-base-content/80 line-clamp-3 text-sm">
                        {{ parent().description }}
                    </p>

                    <div class="collapse-arrow bg-base-200 collapse">
                        <input type="checkbox" />
                        <div class="collapse-title font-medium" i18n="@@parents.healthTests">
                            Voir ses tests de santé
                        </div>
                        <div class="collapse-content">
                            <ul class="list-disc pl-5 text-xs">
                                @for (test of parent().healthTests; track test.name) {
                                    <li>{{ test.name }}</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="card-actions justify-end">
                    @if (showViewButton) {
                        <a
                            [routerLink]="[routes.parents.path, parent().id]"
                            class="btn btn-primary btn-sm"
                        >
                            <span i18n="@@parents.viewDetails">Voir détails</span>
                        </a>
                    }
                </div>
            </div>
        </div>
    `,
})
export class ParentCardComponent {
    @Input({ required: true }) set parentData(value: Parent) {
        this.parent.set(value);
    }
    @Input() showViewButton = true;
    @Input() showAge = true;

    parent = signal<Parent>({} as Parent);
    routes = routes;

    mainImage = computed(() => {
        const images = this.parent().images;
        if (!images || images.length === 0) {
            return { publicId: '', alt: 'Aucune image' };
        }
        return images.find((img) => img.isMain) || images[0];
    });

    getAge(): number {
        const birthDate = new Date(this.parent().birthDate);
        const today = new Date();
        const ageInMs = today.getTime() - birthDate.getTime();
        const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25));
        return ageInYears;
    }
}
