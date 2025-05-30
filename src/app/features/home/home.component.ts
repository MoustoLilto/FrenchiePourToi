import { Component, inject } from '@angular/core';
import { layoutStore } from '@/core/stores/layout.store';
import { IntersectionObserverDirective } from '@/shared/directives/intersection-observer.directive';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { PuppyMiniatureComponent } from './puppy-miniature/puppy-miniature.component';
import { ParentMiniatureComponent } from './parent-miniature.component';
import { TestimonialMiniatureComponent } from './testimonial-miniature/testimonial-miniature.component';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { Testimonial } from '@/core/models/testimonial.model';
import { LoadingStateComponent } from '@/shared/components/loading-state.component';
import { PuppyStore } from '@/core/stores/puppy.store';
import { ParentStore } from '~/app/core/stores/parent.store';

@Component({
    selector: 'app-home',
    imports: [
        IntersectionObserverDirective,
        CloudinaryImageComponent,
        RouterLink,
        PuppyMiniatureComponent,
        TestimonialMiniatureComponent,
        LoadingStateComponent,
        ParentMiniatureComponent,
    ],
    template: `
        <div class="container flex h-full min-h-full flex-col">
            <!-- Section Présentation -->
            <header
                class="section flex-col-center min-h-90 h-max w-full gap-x-12 gap-y-0 md:flex-row"
            >
                <app-cloudinary-image
                    appIntersectionObserver
                    (intersectionChange)="onIntersectionChange($event)"
                    class="flex-center min-h-34 relative size-full md:w-1/3"
                    [sizes]="'(max-width: 768px) 100vw, 33vw'"
                    inputClass="object-contain"
                    publicId="logo_l4z9mp"
                    [isPriority]="true"
                    i18n-alt="@@home.hero.alt"
                    alt="Hero picture"
                    [isFilled]="true"
                />

                <div class="flex-col-start h-full w-full gap-6 md:w-2/3">
                    <h1 class="text-h1">Frenchie Pour Toi</h1>

                    <p class="flex-col-start gap-4 text-base font-medium">
                        <span i18n="@@home.hero.description">
                            Nous sommes un élevage familial spécialisé dans les bouledogues français
                            de qualité. Nos chiots sont élevés avec amour et attention pour devenir
                            vos fidèles compagnons.
                        </span>

                        <span i18n="@@home.hero.additionalInfo">
                            Chaque chiot est issu de parents sélectionnés pour leur santé, leur
                            tempérament et leur conformité aux standards de la race. Nous mettons
                            tout en œuvre pour vous offrir des chiots en parfaite santé et bien
                            socialisés.
                        </span>
                    </p>

                    <a [routerLink]="routes.puppies.path" class="btn btn-primary w-fit">
                        <span i18n="@@home.hero.viewMore">Voir nos chiots</span>
                    </a>
                </div>
            </header>

            <!-- Section Derniers Chiots -->
            <section class="section">
                <h2 class="text-h2 text-center" i18n="@@home.puppies.title">Nos derniers chiots</h2>

                <app-loading-state [state]="puppyStore.puppies()">
                    <ng-template let-state>
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            @for (puppy of puppyStore.getFeaturedPuppies(); track puppy.id) {
                                <app-puppy-miniature [puppy]="puppy" />
                            } @empty {
                                <div class="flex-center flex-col gap-4">
                                    <p i18n="@@common.noData">Aucun chiot disponible</p>
                                </div>
                            }
                        </div>
                    </ng-template>
                </app-loading-state>

                <div class="flex-center">
                    <a
                        [routerLink]="routes.puppies.path"
                        class="btn btn-outline"
                        i18n="@@home.puppies.viewAll"
                    >
                        Voir tous nos chiots
                    </a>
                </div>
            </section>

            <!-- Section Pourquoi nous choisir -->
            <section class="section bg-base-100 rounded-lg">
                <h2 class="text-h2 text-center" i18n="@@home.whyUs.title">
                    Pourquoi nous choisir ?
                </h2>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="card bg-base-200">
                        <div class="card-body items-center text-center">
                            <i class="icon-[carbon--certificate] text-primary text-5xl"></i>
                            <h3 class="card-title font-serif" i18n="@@home.whyUs.quality">
                                Qualité garantie
                            </h3>
                            <p i18n="@@home.whyUs.qualityDescription">
                                Nos chiots sont issus de lignées sélectionnées pour leur santé et
                                leur conformité aux standards de la race.
                            </p>
                        </div>
                    </div>

                    <div class="card bg-base-200">
                        <div class="card-body items-center text-center">
                            <i class="icon-[carbon--health-cross] text-primary text-5xl"></i>
                            <h3 class="card-title font-serif" i18n="@@home.whyUs.followUp">
                                Suivi vétérinaire
                            </h3>
                            <p i18n="@@home.whyUs.followUpDescription">
                                Tous nos chiots bénéficient d'un suivi vétérinaire complet et sont
                                vendus vaccinés et identifiés.
                            </p>
                        </div>
                    </div>

                    <div class="card bg-base-200">
                        <div class="card-body items-center text-center">
                            <i class="icon-[carbon--home] text-primary text-5xl"></i>
                            <h3 class="card-title font-serif" i18n="@@home.whyUs.family">
                                Élevage familial
                            </h3>
                            <p i18n="@@home.whyUs.familyDescription">
                                Nos chiots grandissent dans un environnement familial, ce qui
                                favorise leur socialisation et leur équilibre.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section Derniers Parents -->
            <section class="section">
                <h2 class="text-h2 text-center" i18n="@@home.parents.title">
                    Nos derniers parents
                </h2>

                <app-loading-state [state]="parentStore.parents()">
                    <ng-template let-state>
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            @for (parent of parentStore.getFeaturedParents(); track parent.id) {
                                <app-parent-miniature [parent]="parent" />
                            } @empty {
                                <div class="flex-center flex-col gap-4">
                                    <p i18n="@@common.noData">Aucun parent disponible</p>
                                </div>
                            }
                        </div>
                    </ng-template>
                </app-loading-state>

                <div class="flex-center">
                    <a
                        [routerLink]="routes.parents.path"
                        class="btn btn-outline"
                        i18n="@@home.parents.viewAll"
                    >
                        Voir tous nos parents
                    </a>
                </div>
            </section>

            <!-- Section Témoignages -->
            <section class="section flex flex-col gap-8">
                <h2 class="text-h2 text-center" i18n="@@home.testimonials.title">
                    Ce que disent nos clients
                </h2>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    @for (testimonial of testimonials; track testimonial.id) {
                        <app-testimonial-miniature [testimonial]="testimonial" />
                    }
                </div>
            </section>

            <!-- Section Contact -->
            <section class="section bg-primary/10 rounded-lg">
                <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div class="flex-center">
                        <app-cloudinary-image
                            inputClass="aspect-1/1 size-46 rounded-full object-cover object-center"
                            publicId="WhatsApp_Image_2025-03-07_at_15.57.45_xy8noe"
                            i18n-alt="@@home.contact.alt"
                            [width]="184"
                            [height]="184"
                            alt="Avatar de l'élevage"
                        />
                    </div>

                    <div class="col-span-2">
                        <h2
                            class="text-primary mb-6 font-serif text-3xl font-bold"
                            i18n="@@home.contact.title"
                        >
                            Contactez-nous
                        </h2>
                        <p class="mb-6" i18n="@@home.contact.description">
                            Vous avez des questions sur nos chiots ou vous souhaitez réserver une
                            visite ? N'hésitez pas à nous contacter, nous serons ravis de vous
                            répondre.
                        </p>
                        <a
                            [routerLink]="routes.about.path"
                            class="btn btn-primary"
                            i18n="@@home.contact.contactUs"
                        >
                            Contactez-nous
                        </a>
                    </div>
                </div>
            </section>
        </div>
    `,
})
export class HomeComponent {
    layoutStore = inject(layoutStore);
    routes = routes;
    puppyStore = inject(PuppyStore);
    parentStore = inject(ParentStore);

    onIntersectionChange(isVisible: boolean) {
        this.layoutStore.setIsHomeLogoVisible(isVisible);
    }

    constructor() {
        this.puppyStore.loadAllPuppies();
        this.parentStore.loadAllParents();
    }

    testimonials: Testimonial[] = [
        {
            id: 1,
            name: $localize`:@@home.testimonials.1.name:Client 1`,
            description: $localize`:@@home.testimonials.1.description:Notre bouledogue est merveilleux ! Nous sommes ravis de l'avoir adopté chez Frenchie Pour Toi. Un grand merci pour votre professionnalisme et votre gentillesse.`,
            image: 'IMG_0460_f8onkt',
            rating: [1, 2, 3, 4, 5],
            ownerSince: '2022',
        },
        {
            id: 2,
            name: $localize`:@@home.testimonials.2.name:Client 2`,
            description: $localize`:@@home.testimonials.2.description:Notre bouledogue est merveilleux ! Nous sommes ravis de l'avoir adopté chez Frenchie Pour Toi. Un grand merci pour votre professionnalisme et votre gentillesse.`,
            image: 'IMG_0460_f8onkt',
            rating: [1, 2, 3, 4],
            ownerSince: '2024',
        },
        {
            id: 3,
            name: $localize`:@@home.testimonials.3.name:Client 3`,
            description: $localize`:@@home.testimonials.3.description:Notre bouledogue est merveilleux ! Nous sommes ravis de l'avoir adopté chez Frenchie Pour Toi. Un grand merci pour votre professionnalisme et votre gentillesse.`,
            image: 'IMG_0460_f8onkt',
            rating: [1, 2, 3, 4, 5],
            ownerSince: '2021',
        },
    ];
}
