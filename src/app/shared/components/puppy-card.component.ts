import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Puppy } from '@/core/models/puppy.model';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { routes } from '@/core/constants/routes.constants';

@Component({
    selector: 'app-puppy-card',
    standalone: true,
    imports: [CommonModule, RouterLink, CloudinaryImageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            class="card shadow-base-content/10 border-base-content/10 bg-base-100 group w-full max-w-sm border shadow-lg"
        >
            <figure class="relative w-full">
                @if (puppy().images && puppy().images.length > 0) {
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
                >
                    <div class="badge" [class]="statusBadgeClass()">
                        {{ puppy().status }}
                    </div>
                </div>
            </figure>

            <div class="card-body">
                <div class="card-title">
                    <div class="flex w-full items-center justify-between">
                        <h3 class="text-base-content text-xl font-bold">{{ puppy().name }}</h3>

                        @if (showPrice) {
                            <span class="text-primary text-lg font-semibold">
                                {{ puppy().price | currency: 'EUR' : 'symbol' : '1.0-0' }}
                            </span>
                        }
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <p class="text-base-content/80 line-clamp-2 text-sm">
                        {{ puppy().description }}
                    </p>

                    @if (showBadges && puppy().features && puppy().features.length > 0) {
                        <div
                            class="flex max-w-full gap-1 overflow-hidden whitespace-nowrap text-xs"
                        >
                            <div class="badge badge-sm badge-ghost max-w-30">
                                <span
                                    class="mr-1"
                                    [class.icon-[carbon--gender-male]]="puppy().gender === 'Mâle'"
                                    [class.icon-[carbon--gender-female]]="
                                        puppy().gender === 'Femelle'
                                    "
                                ></span>
                                {{ puppy().gender }}
                            </div>

                            @for (feature of puppy().features.slice(0, 2); track feature) {
                                <span class="badge badge-sm badge-ghost max-w-30">
                                    {{ feature }}
                                </span>
                            }

                            @if (puppy().features.length > 2) {
                                <span class="badge badge-sm badge-ghost">
                                    +{{ puppy().features.length - 2 }}
                                </span>
                            }
                        </div>
                    }

                    @if (showAge) {
                        <div class="text-base-content/70 flex-start">
                            <span class="icon-[carbon--calendar] mr-2"></span>
                            {{ calculateAge() }} semaines
                        </div>
                    }
                </div>

                <div class="card-actions">
                    <div class="flex w-full gap-2">
                        @if (showViewButton) {
                            <a
                                [routerLink]="[routes.puppies.path, puppy().id]"
                                class="btn btn-primary btn-sm flex-1"
                                [attr.aria-label]="'Voir les détails de ' + puppy().name"
                            >
                                <span class="icon-[carbon--view] mr-1"></span>
                                <span i18n="@@puppy.card.view">Voir détails</span>
                            </a>
                        }

                        @if (showReserveButton && puppy().status === 'available') {
                            <a
                                [routerLink]="[routes.reservation.path]"
                                [queryParams]="{ puppy: puppy().id }"
                                class="btn btn-accent btn-sm flex-1"
                                [attr.aria-label]="'Réserver ' + puppy().name"
                            >
                                <span class="icon-[carbon--bookmark] mr-1"></span>
                                <span i18n="@@puppy.card.reserve">Réserver</span>
                            </a>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class PuppyCardComponent {
    @Input({ required: true }) set puppyData(value: Puppy) {
        this.puppy.set(value);
    }

    @Input() cardClass = 'w-full max-w-sm';
    @Input() showPrice = true;
    @Input() showAge = true;
    @Input() showBadges = true;
    @Input() showViewButton = true;
    @Input() showReserveButton = false;

    puppy = signal<Puppy>({} as Puppy);
    routes = routes;

    mainImage = computed(() => {
        const images = this.puppy().images;
        if (!images || images.length === 0) {
            return { publicId: '', alt: 'Aucune image' };
        }
        return images.find((img) => img.isMain) || images[0];
    });

    statusBadgeClass = computed(() => {
        const status = this.puppy().status;
        switch (status) {
            case 'available':
                return 'badge-success';
            case 'reserved':
                return 'badge-warning';
            case 'sold':
                return 'badge-error';
            default:
                return 'badge-neutral';
        }
    });

    calculateAge(): number {
        const birthDate = new Date(this.puppy().birthDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - birthDate.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    }
}
