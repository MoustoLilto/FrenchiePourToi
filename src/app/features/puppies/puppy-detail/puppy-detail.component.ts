import { Component, ChangeDetectionStrategy, computed, inject, OnInit } from '@angular/core';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { SocialLinksComponent } from '@/shared/components/social-links.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';
import { Puppy } from '@/core/models/puppy.model';
import { PuppyStore } from '@/core/stores/puppy.store';
import { DatePipe, CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-puppy-detail',
    standalone: true,
    imports: [
        CloudinaryImageComponent,
        SocialLinksComponent,
        RouterLink,
        DatePipe,
        CurrencyPipe,
        SlicePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="container flex h-full min-h-full flex-col gap-y-12">
            @if (puppy(); as currentPuppy) {
                <!-- Header avec statut -->
                <header class="section-header">
                    <div class="flex-between mb-4">
                        <div class="breadcrumbs text-sm">
                            <ul>
                                <li>
                                    <a
                                        [routerLink]="routes.home.path"
                                        i18n="@@common.breadcrumb.home"
                                    >
                                        Accueil
                                    </a>
                                </li>
                                <li>
                                    <a
                                        [routerLink]="routes.puppies.path"
                                        i18n="@@puppies.breadcrumb"
                                    >
                                        Nos chiots
                                    </a>
                                </li>
                                <li>{{ currentPuppy.name }}</li>
                            </ul>
                        </div>

                        <div class="flex gap-2">
                            @if (currentPuppy.status === 'reserved') {
                                <div class="badge badge-warning badge-lg">
                                    <span class="icon-[carbon--calendar-heat-map] mr-1"></span>
                                    <span i18n="@@puppy.status.reserved">Réservé</span>
                                </div>
                            } @else if (currentPuppy.status === 'available') {
                                <div class="badge badge-success badge-lg">
                                    <span class="icon-[carbon--checkmark] mr-1"></span>
                                    <span i18n="@@puppy.status.available">Disponible</span>
                                </div>
                            } @else {
                                <div class="badge badge-error badge-lg">
                                    <span class="icon-[carbon--close] mr-1"></span>
                                    <span i18n="@@puppy.status.adopted">Adopté</span>
                                </div>
                            }
                        </div>
                    </div>

                    <h1 class="text-h1 mb-6 text-center">{{ currentPuppy.name }}</h1>

                    <p class="text-base-content/70 mx-auto max-w-3xl text-center text-lg">
                        {{ currentPuppy.description }}
                    </p>
                </header>

                <!-- Galerie d'images -->
                <section class="section-content">
                    <h2 class="text-h2 mb-8 text-center" i18n="@@puppy.gallery.title">Photos</h2>

                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        @for (image of currentPuppy.images | slice: 0 : 6; track image.publicId) {
                            <div
                                class="group relative overflow-hidden rounded-lg shadow-lg"
                                [class.md:col-span-2]="image.isMain && $index === 0"
                                [class.lg:col-span-2]="image.isMain && $index === 0"
                            >
                                <app-cloudinary-image
                                    [publicId]="image.publicId"
                                    [alt]="image.alt"
                                    [isFilled]="true"
                                    inputClass="aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                                    [sizes]="
                                        image.isMain
                                            ? '(max-width: 768px) 100vw, 66vw'
                                            : '(max-width: 768px) 100vw, 33vw'
                                    "
                                />
                                <div
                                    class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
                                ></div>
                            </div>
                        }
                    </div>
                </section>

                <!-- Informations principales -->
                <section class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <!-- Informations de base -->
                    <div class="card bg-base-100 shadow-xl lg:col-span-2">
                        <div class="card-body">
                            <h3
                                class="card-title text-primary mb-6"
                                i18n="@@puppy.details.basic.title"
                            >
                                Informations générales
                            </h3>

                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div class="flex-between border-base-300 border-b py-3">
                                    <span class="font-medium" i18n="@@puppy.details.gender">
                                        Sexe :
                                    </span>
                                    <span
                                        class="badge"
                                        [class.badge-info]="currentPuppy.gender === 'male'"
                                        [class.badge-secondary]="currentPuppy.gender === 'female'"
                                    >
                                        @if (currentPuppy.gender === 'male') {
                                            <span i18n="@@puppy.gender.male">Mâle</span>
                                        } @else {
                                            <span i18n="@@puppy.gender.female">Femelle</span>
                                        }
                                    </span>
                                </div>

                                <div class="flex-between border-base-300 border-b py-3">
                                    <span class="font-medium" i18n="@@puppy.details.birth">
                                        Naissance :
                                    </span>
                                    <span>{{ currentPuppy.birthDate | date: 'dd/MM/yyyy' }}</span>
                                </div>

                                <div class="flex-between border-base-300 border-b py-3">
                                    <span class="font-medium" i18n="@@puppy.details.color">
                                        Couleur :
                                    </span>
                                    <span>{{ currentPuppy.color }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Prix et réservation -->
                    <div class="card bg-primary/5 shadow-xl">
                        <div class="card-body items-center text-center">
                            <h3
                                class="card-title text-primary mb-4"
                                i18n="@@puppy.details.price.title"
                            >
                                Prix et réservation
                            </h3>

                            <div class="text-primary mb-4 text-3xl font-bold">
                                {{ currentPuppy.price | currency: 'EUR' : 'symbol' : '1.0-0' }}
                            </div>

                            <div class="card-actions w-full justify-center">
                                @if (currentPuppy.status === 'available') {
                                    <a
                                        [routerLink]="routes.about.path"
                                        class="btn btn-primary btn-block"
                                    >
                                        <span class="icon-[carbon--calendar-add] mr-2"></span>
                                        <span i18n="@@puppy.cta.reserve">Réserver ce chiot</span>
                                    </a>
                                    <a
                                        [routerLink]="routes.about.path"
                                        class="btn btn-outline btn-block"
                                    >
                                        <span class="icon-[carbon--chat] mr-2"></span>
                                        <span i18n="@@puppy.cta.contact">Poser une question</span>
                                    </a>
                                } @else if (currentPuppy.status === 'reserved') {
                                    <div class="alert alert-warning">
                                        <span class="icon-[carbon--information]"></span>
                                        <span i18n="@@puppy.message.reserved">
                                            Ce chiot est déjà réservé
                                        </span>
                                    </div>
                                } @else {
                                    <div class="alert alert-info">
                                        <span class="icon-[carbon--information]"></span>
                                        <span i18n="@@puppy.message.adopted">
                                            Ce chiot a trouvé sa famille
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Informations sur les parents -->
                <section class="section-content bg-base-200 rounded-lg">
                    <h2 class="text-h2 mb-8 text-center" i18n="@@puppy.parents.title">
                        Les parents
                    </h2>

                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <!-- Père -->
                        <div class="card bg-base-100 shadow-lg">
                            <div class="card-body">
                                <h3 class="card-title text-info mb-4">
                                    <span class="icon-[carbon--user] mr-2"></span>
                                    <span i18n="@@puppy.parents.father">Père</span>
                                </h3>
                                <p class="text-lg font-semibold">
                                    {{ currentPuppy.parents.father }}
                                </p>
                            </div>
                        </div>

                        <!-- Mère -->
                        <div class="card bg-base-100 shadow-lg">
                            <div class="card-body">
                                <h3 class="card-title text-secondary mb-4">
                                    <span class="icon-[carbon--user] mr-2"></span>
                                    <span i18n="@@puppy.parents.mother">Mère</span>
                                </h3>
                                <p class="text-lg font-semibold">
                                    {{ currentPuppy.parents.mother }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Vaccinations -->
                @if (currentPuppy.vaccines.length > 0) {
                    <section class="section-content">
                        <h2 class="text-h2 mb-8 text-center" i18n="@@puppy.health.title">
                            Suivi de santé
                        </h2>

                        <div class="card bg-base-100 shadow-lg">
                            <div class="card-body">
                                <h3 class="card-title text-success mb-4">
                                    <span class="icon-[carbon--medication] mr-2"></span>
                                    <span i18n="@@puppy.health.vaccinations">Vaccinations</span>
                                </h3>

                                <div class="space-y-3">
                                    @for (
                                        vaccination of currentPuppy.vaccines;
                                        track vaccination.name + vaccination.date
                                    ) {
                                        <div class="border-success border-l-4 py-2 pl-4">
                                            <div class="font-medium">
                                                {{ vaccination.name }}
                                            </div>
                                            <div class="text-base-content/70 text-sm">
                                                {{ vaccination.date | date: 'dd/MM/yyyy' }}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                }

                <!-- CTA final -->
                <section class="section-content bg-primary/10 rounded-lg">
                    <h3 class="text-h3 text-center" i18n="@@puppy.cta.final.title">
                        Intéressé par {{ currentPuppy.name }} ?
                    </h3>

                    <p class="mx-auto mb-6 max-w-2xl text-center">
                        @if (currentPuppy.status === 'available') {
                            <span i18n="@@puppy.cta.final.description">
                                Contactez-nous dès maintenant pour en savoir plus sur ce magnifique
                                chiot ou pour organiser une rencontre.
                            </span>
                        } @else {
                            <span i18n="@@puppy.cta.final.other">
                                Découvrez nos autres chiots disponibles ou restez informé de nos
                                prochaines portées.
                            </span>
                        }
                    </p>

                    <div class="flex flex-wrap justify-center gap-4">
                        @if (currentPuppy.status === 'available') {
                            <a [routerLink]="routes.about.path" class="btn btn-primary">
                                <span class="icon-[carbon--phone] mr-2"></span>
                                <span i18n="@@puppy.cta.contact">Nous contacter</span>
                            </a>
                        }

                        <a [routerLink]="routes.puppies.path" class="btn btn-outline">
                            <span class="icon-[carbon--arrow-left] mr-2"></span>
                            <span i18n="@@puppy.cta.back">Voir tous nos chiots</span>
                        </a>
                    </div>
                </section>
            } @else {
                <!-- État de chargement ou chiot non trouvé -->
                <div class="flex-center min-h-[50vh]">
                    <div class="text-center">
                        <span class="icon-[carbon--dog] text-base-content/50 mb-4 text-6xl"></span>
                        <h2 class="text-h2 mb-4" i18n="@@puppy.not.found.title">
                            Chiot non trouvé
                        </h2>
                        <p class="text-base-content/70 mb-6" i18n="@@puppy.not.found.description">
                            Désolé, nous n'avons pas trouvé ce chiot. Il a peut-être déjà été
                            adopté.
                        </p>
                        <a [routerLink]="routes.puppies.path" class="btn btn-primary">
                            <span i18n="@@puppy.not.found.cta">Voir nos chiots disponibles</span>
                        </a>
                    </div>
                </div>
            }
        </div>
    `,
})
export class PuppyDetailComponent implements OnInit {
    // Injection des services
    private readonly route = inject(ActivatedRoute);
    private readonly puppyStore = inject(PuppyStore);

    // Constantes pour les routes
    protected readonly routes = routes;

    ngOnInit() {
        this.puppyStore.loadAllPuppies();
    }

    // Computed pour récupérer le chiot à partir de l'ID dans l'URL
    readonly puppy = computed(() => {
        const puppyId = this.route.snapshot.paramMap.get('id');
        if (!puppyId) return null;

        const puppies = this.puppyStore.puppies().data;
        if (!puppies || !this.puppyStore.isPuppiesLoaded()) return null;

        const foundPuppy = puppies.find((p: Puppy) => p.id === puppyId);
        if (foundPuppy?.images) {
            // Trier les images par ordre et mettre l'image principale en premier
            foundPuppy.images.sort((a, b) => {
                if (a.isMain && !b.isMain) return -1;
                if (!a.isMain && b.isMain) return 1;
                return 0; // Pas d'ordre spécifique pour les autres
            });
        }
        return foundPuppy || null;
    });
}
