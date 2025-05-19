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
        <div class="h-160 container">
            <div class="section flex-col-center size-full gap-12 md:flex-row">
                <div
                    appIntersectionObserver
                    (intersectionChange)="onIntersectionChange($event)"
                    class="flex-center relative h-full w-full md:w-1/3"
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
            </div>
        </div>
    `,
})
export class HomeComponent {
    layoutStore = inject(layoutStore);
    routes = routes;
    onIntersectionChange(isVisible: boolean) {
        this.layoutStore.setIsHomeLogoVisible(isVisible);
    }
}
