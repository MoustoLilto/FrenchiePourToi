import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { SocialLinksComponent } from '@/shared/components/social-links.component';
import { TeamMember } from '../../models/team-member.interface';

@Component({
    selector: 'app-team-section',
    standalone: true,
    imports: [CloudinaryImageComponent, SocialLinksComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="section-content">
            <div class="flex-col-center gap-8">
                <h2 class="text-h2 text-center" i18n="@@about.team.title">Notre équipe</h2>

                <p class="text-base-content/70 max-w-2xl text-center" i18n="@@about.team.subtitle">
                    Une équipe passionnée et dévouée qui s'engage à vous offrir les meilleurs
                    bouledogues français
                </p>

                <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    @for (member of teamMembers(); track member.id) {
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body items-center text-center">
                                <div class="avatar mb-4">
                                    <div
                                        class="w-32 rounded-full ring ring-{{
                                            member.colorClass
                                        }} ring-offset-2 ring-offset-base-100"
                                    >
                                        <app-cloudinary-image
                                            inputClass="aspect-1/1 size-46 rounded-full object-cover object-center"
                                            publicId="WhatsApp_Image_2025-03-07_at_15.57.45_xy8noe"
                                            i18n-alt="@@home.contact.alt"
                                            [width]="184"
                                            [height]="184"
                                            alt="Avatar de l'élevage"
                                        />
                                    </div>
                                </div>

                                <h3 class="card-title text-{{ member.colorClass }}">
                                    {{ member.name }}
                                </h3>

                                <p class="text-base-content/70 mb-4">
                                    {{ member.role }}
                                </p>

                                <p class="text-base-content/60 mb-6 text-sm">
                                    {{ member.description }}
                                </p>

                                <app-social-links
                                    inputClass="btn btn-ghost btn-sm btn-circle"
                                    [withLabel]="false"
                                    [socialLinksToShow]="member.socialLinks ?? []"
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    `,
})
export class TeamSectionComponent {
    private readonly _teamMembers = signal<TeamMember[]>([
        {
            id: 'marie-dupont',
            name: $localize`Marie Dupont`,
            role: $localize`Fondatrice & Éleveuse principale`,
            description: $localize`Passionnée par les bouledogues français depuis plus de 15 ans, Marie veille à la santé et au bien-être de chaque chiot.`,
            imagePublicId: 'team-member-1_placeholder',
            colorClass: 'primary',
            socialLinks: [
                { url: 'https://facebook.com/frenchiepourtoi', icon: 'carbon--logo-facebook' },
                { url: 'https://instagram.com/frenchiepourtoi', icon: 'carbon--logo-instagram' },
            ],
        },
        {
            id: 'pierre-martin',
            name: $localize`Pierre Martin`,
            role: $localize`Vétérinaire conseil`,
            description: $localize`Vétérinaire spécialisé en reproduction canine, Pierre assure le suivi médical de tous nos reproducteurs.`,
            imagePublicId: 'team-member-2_placeholder',
            colorClass: 'secondary',
            socialLinks: [
                { url: 'https://linkedin.com/in/pierre-martin-vet', icon: 'carbon--logo-linkedin' },
            ],
        },
        {
            id: 'sophie-leblanc',
            name: $localize`Sophie Leblanc`,
            role: $localize`Responsable socialisation`,
            description: $localize`Spécialiste du comportement canin, Sophie s'occupe de la socialisation précoce de nos chiots.`,
            imagePublicId: 'team-member-3_placeholder',
            colorClass: 'accent',
            socialLinks: [
                {
                    url: 'https://instagram.com/sophie_canine_behavior',
                    icon: 'carbon--logo-instagram',
                },
                {
                    url: 'https://facebook.com/sophie.comportement.canin',
                    icon: 'carbon--logo-facebook',
                },
            ],
        },
    ]);

    readonly teamMembers = computed(() => this._teamMembers());
}
