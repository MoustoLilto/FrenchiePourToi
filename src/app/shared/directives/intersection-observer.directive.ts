import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Signal,
    inject,
    signal,
} from '@angular/core';

@Directive({
    selector: '[appIntersectionObserver]',
    exportAs: 'intersectionObserver',
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
    private _elementRef = inject(ElementRef);
    private _observer?: IntersectionObserver;
    private _isVisible = signal(false);

    @Input() intersectionThreshold = 0;

    @Output() visibilityChange = new EventEmitter<boolean>();
    @Output() intersecting = new EventEmitter<void>();
    @Output() notIntersecting = new EventEmitter<void>();

    public readonly isVisible: Signal<boolean> = this._isVisible.asReadonly();

    ngOnInit(): void {
        this._observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    if (!this._isVisible()) {
                        this._isVisible.set(true);
                        this.visibilityChange.emit(true);
                        this.intersecting.emit();
                    }
                } else {
                    if (this._isVisible()) {
                        this._isVisible.set(false);
                        this.visibilityChange.emit(false);
                        this.notIntersecting.emit();
                    }
                }
            },
            { threshold: this.intersectionThreshold }
        );
        this._observer.observe(this._elementRef.nativeElement);
    }

    ngOnDestroy(): void {
        if (this._observer) {
            this._observer.disconnect();
            this._observer = undefined;
        }
    }
}
