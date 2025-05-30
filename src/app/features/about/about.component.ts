import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLinksComponent } from '@/shared/components/social-links.component';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { RouterLink } from '@angular/router';
import { address } from '@/core/constants/address.constants';
import { routes } from '@/core/constants/routes.constants';
import { TeamSectionComponent } from './components/team-section/team-section.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [
        CommonModule,
        SocialLinksComponent,
        CloudinaryImageComponent,
        RouterLink,
        TeamSectionComponent,
    ],
    templateUrl: './about.component.html',
})
export class AboutComponent {
    routes = routes;
    address = address;

    values = [
        {
            icon: 'icon-[carbon--favorite]',
            title: $localize`:@@about.values.health.title:Santé & Bien-être`,
            description: $localize`:@@about.values.health.description:La santé de nos chiens est notre priorité absolue. Tous nos reproducteurs sont testés pour les maladies génétiques courantes et reçoivent un suivi vétérinaire régulier.`,
        },
        {
            icon: 'icon-[carbon--certificate]',
            title: $localize`:@@about.values.quality.title:Qualité & Sélection`,
            description: $localize`:@@about.values.quality.description:Nous sélectionnons rigoureusement nos reproducteurs pour leur beauté, leur caractère équilibré et leur santé. Notre objectif est d'améliorer constamment la race tout en préservant ses caractéristiques.`,
        },
        {
            icon: 'icon-[carbon--home]',
            title: $localize`:@@about.values.well-being.title:Bien-être & Caractère`,
            description: $localize`:@@about.values.well-being.description:Nous sommes fiers de produire des chiots de qualité. Tous nos reproducteurs sont testés pour les maladies génétiques courantes et reçoivent un suivi vétérinaire régulier.`,
        },
    ];
}
