import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ContentChild,
    TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingState } from '../rxjs/with-loading-state.operator';

@Component({
    selector: 'app-loading-state',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngIf="state">
            @if (state.loading) {
                <ng-container *ngTemplateOutlet="loadingTpl || defaultLoadingTpl"></ng-container>

                <ng-template #defaultLoadingTpl>
                    <div class="flex-center flex-col gap-4">
                        <div class="loading loading-spinner loading-lg text-primary"></div>
                        <p i18n="@@common.loading">Chargement en cours...</p>
                    </div>
                </ng-template>
            } @else if (state.error) {
                <ng-container
                    *ngTemplateOutlet="
                        errorTpl || defaultErrorTpl;
                        context: { $implicit: state.error, error: state.error }
                    "
                ></ng-container>

                <ng-template #defaultErrorTpl let-error>
                    <div class="alert alert-error">
                        <i class="icon-[carbon--warning] text-2xl"></i>
                        <div>
                            <h3 class="font-bold" i18n="@@common.error">Erreur</h3>
                            <div>{{ error }}</div>
                        </div>
                    </div>
                </ng-template>
            } @else {
                <ng-container *ngIf="contentTemplate">
                    <ng-template
                        [ngTemplateOutlet]="contentTemplate"
                        [ngTemplateOutletContext]="{ $implicit: state, state: state }"
                    ></ng-template>
                </ng-container>

                <ng-container *ngIf="!contentTemplate">
                    <ng-content></ng-content>
                </ng-container>
            }
        </ng-container>
    `,
})
export class LoadingStateComponent<T> {
    @Input() state?: LoadingState<T> | null;
    @ContentChild(TemplateRef) contentTemplate?: TemplateRef<any>;
    @ContentChild('loading', { read: TemplateRef }) loadingTpl?: TemplateRef<any>;
    @ContentChild('error', { read: TemplateRef }) errorTpl?: TemplateRef<any>;
}
