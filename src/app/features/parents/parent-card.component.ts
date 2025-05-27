import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
            class="card bg-base-100 border-base-content/10 shadow-base-content/10 group border shadow-lg transition-all duration-300 hover:shadow-xl"
        >
            <!-- Image principale -->
            <figure class="relative overflow-hidden">
                @if (parentData.images.length > 0) {
                    <app-cloudinary-image
                        [publicId]="mainImage.publicId"
                        [alt]="mainImage.alt"
                        [sizes]="'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'"
                        inputClass="aspect-[3/2] object-cover transition-transform duration-300 group-hover:scale-105"
                        [isFilled]="true"
                    />
                } @else {
                    <div class="bg-base-200 flex-center aspect-[3/2] w-full">
                        <i class="icon-[carbon--image] text-base-content/30 text-4xl"></i>
                    </div>
                }

                <!-- Badge de statut -->
                <div class="absolute left-3 top-3">
                    @if (parentData.status === 'active') {
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
                    @if (parentData.gender === 'male') {
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

            <!-- Contenu de la carte -->
            <div class="card-body p-4">
                <!-- Nom et informations de base -->
                <div class="mb-3">
                    <h3 class="card-title font-serif text-lg">{{ parentData.name }}</h3>
                    <p class="text-base-content/70 text-sm">{{ parentData.color }}</p>
                </div>

                <!-- Description courte -->
                <p class="text-base-content/80 mb-4 line-clamp-2 text-sm">
                    {{ parentData.description }}
                </p>

                <!-- Informations détaillées -->
                <div class="mb-4 space-y-2">
                    <!-- Âge -->
                    <div class="flex items-center gap-2 text-sm">
                        <i class="icon-[carbon--calendar] text-base-content/60"></i>
                        <span class="text-base-content/70">
                            {{ getAge() }}
                            <span i18n="@@parents.age.years">ans</span>
                        </span>
                    </div>

                    <!-- Poids -->
                    <div class="flex items-center gap-2 text-sm">
                        <i class="icon-[carbon--scale] text-base-content/60"></i>
                        <span class="text-base-content/70">{{ parentData.weight }} kg</span>
                    </div>

                    <!-- Pedigree -->
                    @if (parentData.pedigree.registration) {
                        <div class="flex items-center gap-2 text-sm">
                            <i class="icon-[carbon--certificate] text-base-content/60"></i>
                            <span class="text-base-content/70">
                                {{ parentData.pedigree.registration }}
                            </span>
                        </div>
                    }
                </div>

                <!-- Tests de santé -->
                @if (parentData.healthTests.length > 0) {
                    <div class="mb-4">
                        <h4
                            class="text-base-content mb-2 text-sm font-medium"
                            i18n="@@parents.healthTests"
                        >
                            Tests de santé
                        </h4>
                        <div class="flex flex-wrap gap-1">
                            @for (test of parentData.healthTests.slice(0, 3); track test.name) {
                                <div class="badge badge-outline badge-xs">
                                    {{ test.name }}
                                </div>
                            }
                            @if (parentData.healthTests.length > 3) {
                                <div class="badge badge-outline badge-xs">
                                    +{{ parentData.healthTests.length - 3 }}
                                </div>
                            }
                        </div>
                    </div>
                }

                <!-- Récompenses -->
                @if (parentData.achievements.length > 0) {
                    <div class="mb-4">
                        <h4
                            class="text-base-content mb-2 text-sm font-medium"
                            i18n="@@parents.achievements"
                        >
                            Récompenses
                        </h4>
                        <div class="flex flex-wrap gap-1">
                            @for (
                                achievement of parentData.achievements.slice(0, 2);
                                track achievement.title
                            ) {
                                <div class="badge badge-warning badge-xs">
                                    <i class="icon-[carbon--trophy] mr-1"></i>
                                    {{ achievement.title }}
                                </div>
                            }
                            @if (parentData.achievements.length > 2) {
                                <div class="badge badge-warning badge-xs">
                                    +{{ parentData.achievements.length - 2 }}
                                </div>
                            }
                        </div>
                    </div>
                }

                <!-- Descendance -->
                @if (parentData.offspring.length > 0) {
                    <div class="mb-4">
                        <div class="flex items-center gap-2 text-sm">
                            <i class="icon-[carbon--group] text-base-content/60"></i>
                            <span class="text-base-content/70">
                                {{ parentData.offspring.length }}
                                <span i18n="@@parents.offspring">chiots</span>
                            </span>
                        </div>
                    </div>
                }

                <!-- Actions -->
                <div class="card-actions justify-end">
                    @if (showViewButton) {
                        <a
                            [routerLink]="[routes.parents.path, parentData.id]"
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
    @Input({ required: true }) parentData!: Parent;
    @Input() showViewButton = true;

    routes = routes;

    get mainImage() {
        return (
            this.parentData.images.find((img) => img.isMain) ||
            this.parentData.images[0] || {
                publicId: 'placeholder-parent',
                alt: `Photo de ${this.parentData.name}`,
                isMain: true,
            }
        );
    }

    getAge(): number {
        const birthDate = new Date(this.parentData.birthDate);
        const today = new Date();
        const ageInMs = today.getTime() - birthDate.getTime();
        const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25));
        return ageInYears;
    }
}
