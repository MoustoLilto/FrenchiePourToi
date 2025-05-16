import { Component, Input } from '@angular/core';
import { socialLinks, SocialLink } from '@/core/constants/social-links.constants';
import { CommonModule, NgClass } from '@angular/common';

@Component({
    selector: 'app-social-links',
    standalone: true,
    imports: [CommonModule, NgClass],
    template: `
        @for (item of socialLinksToShow; track item.url) {
            <a
                [href]="item.url"
                [attr.aria-label]="item.label"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-btn gap-0.5 transition-colors"
                [ngClass]="inputClass"
            >
                <span [class]="'icon-[' + item.icon + ']'" aria-hidden="true"></span>
                @if (withLabel) {
                    <span>{{ item.label }}</span>
                }
            </a>
        }
    `,
})
export class SocialLinksComponent {
    @Input() socialLinksToShow: SocialLink[] = Object.values(socialLinks);
    @Input() withLabel = false;
    @Input() inputClass = 'text-base';
}
