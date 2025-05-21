import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';

@Directive({
    selector: '[appLoadingState]',
    standalone: true,
})
export class LoadingStateDirective<T> implements OnInit, OnDestroy {
    @Input({ required: true }) appLoadingState!: Observable<LoadingState<T>>;
    @Input() appLoadingStateLoading!: TemplateRef<any>;
    @Input() appLoadingStateError!: TemplateRef<any>;
    @Input() appLoadingStateData!: TemplateRef<any>;

    private subscription?: Subscription;

    constructor(
        private viewContainer: ViewContainerRef,
        private defaultTemplate: TemplateRef<any>
    ) {}

    ngOnInit(): void {
        this.subscription = this.appLoadingState.subscribe((state) => {
            this.viewContainer.clear();

            if (state.loading && this.appLoadingStateLoading) {
                this.viewContainer.createEmbeddedView(this.appLoadingStateLoading);
            } else if (state.error && this.appLoadingStateError) {
                this.viewContainer.createEmbeddedView(this.appLoadingStateError, {
                    $implicit: state.error,
                });
            } else if (state.data && this.appLoadingStateData) {
                this.viewContainer.createEmbeddedView(this.appLoadingStateData, {
                    $implicit: state.data,
                });
            } else {
                this.viewContainer.createEmbeddedView(this.defaultTemplate, {
                    $implicit: state,
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
