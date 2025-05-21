import { Component, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-slot',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-container *ngIf="contentTemplate; else fallbackTpl">
            <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
        </ng-container>
        <ng-template #fallbackTpl>
            <ng-container *ngIf="fallbackTemplate">
                <ng-template [ngTemplateOutlet]="fallbackTemplate"></ng-template>
            </ng-container>
        </ng-template>
    `,
})
export class SlotComponent {
    @ContentChild(TemplateRef) contentTemplate?: TemplateRef<any>;
    @ContentChild('fallback', { read: TemplateRef }) fallbackTemplate?: TemplateRef<any>;
}
