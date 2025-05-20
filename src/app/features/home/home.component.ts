import { Component, inject } from '@angular/core';
import { layoutStore } from '@/core/stores/layout.store';
import { IntersectionObserverDirective } from '@/shared/directives/intersection-observer.directive';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
@Component({
    selector: 'app-home',
    imports: [IntersectionObserverDirective, CloudinaryImageComponent, RouterLink],
    template: `
        <div class="container flex flex-col py-16">
            <!-- Section Présentation -->
            <section class="section flex-col-center h-120 w-full gap-12 md:flex-row">
                <div
                    appIntersectionObserver
                    (intersectionChange)="onIntersectionChange($event)"
                    class="flex-center min-h-34 relative h-full w-full md:w-1/3"
                >
                    <app-cloudinary-image
                        class="relative size-full"
                        [sizes]="'(max-width: 768px) 100vw, 33vw'"
                        inputClass="object-contain"
                        publicId="logo_l4z9mp"
                        [isPriority]="true"
                        i18n-alt="@@home.hero.alt"
                        alt="Bouledogue Français"
                        [isFilled]="true"
                    />
                </div>

                <div class="flex-col-start h-full w-full gap-6 md:w-2/3">
                    <h1 class="text-h1">Frenchie Pour Toi</h1>

                    <p class="text-subtitle flex-col-start gap-4">
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
            </section>

            <!-- Section Derniers Chiots -->
            <section class="section flex flex-col gap-8">
                <h2 class="text-h2 text-center" i18n="@@home.puppies.title">Nos derniers chiots</h2>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    @for (puppy of puppies; track puppy.id) {
                        <div class="card bg-base-100 shadow-xl">
                            <figure class="size-full">
                                <app-cloudinary-image
                                    class="flex-center relative size-full"
                                    [publicId]="puppy.image"
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
                    }
                </div>

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
            <section class="section bg-base-100 flex flex-col gap-8 rounded-lg">
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

            <!-- Section Témoignages -->
            <section class="section flex flex-col gap-8">
                <h2 class="text-h2 text-center" i18n="@@home.testimonials.title">
                    Ce que disent nos clients
                </h2>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    @for (testimonial of testimonials; track testimonial.id) {
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
                                        <p class="text-sm">
                                            Propriétaire depuis {{ testimonial.ownerSince }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            i18n-alt="@@home.puppies.alt"
                            [width]="184"
                            [height]="184"
                            alt="Chiot bouledogue français"
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

    onIntersectionChange(isVisible: boolean) {
        this.layoutStore.setIsHomeLogoVisible(isVisible);
    }

    puppies = [
        {
            id: 1,
            name: $localize`:@@home.puppies.1.name:Chiot 1`,
            description: $localize`:@@home.puppies.1.description:Chiot bouledogue français`,
            image: 'WhatsApp_Image_2025-03-07_at_15.53.50_bo9rhj',
        },
        {
            id: 2,
            name: $localize`:@@home.puppies.2.name:Chiot 2`,
            description: $localize`:@@home.puppies.2.description:Chiot bouledogue français`,
            image: 'WhatsApp_Image_2025-03-07_at_15.53.50_bo9rhj',
        },
        {
            id: 3,
            name: $localize`:@@home.puppies.3.name:Chiot 3`,
            description: $localize`:@@home.puppies.3.description:Chiot bouledogue français`,
            image: 'WhatsApp_Image_2025-03-07_at_15.53.50_bo9rhj',
        },
    ];

    testimonials = [
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
