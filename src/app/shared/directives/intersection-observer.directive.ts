import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    Signal,
    inject,
    signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appIntersectionObserver]',
    exportAs: 'intersectionObserver',
    standalone: true,
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
    private _elementRef = inject(ElementRef);
    private _observer?: IntersectionObserver;
    private _isVisible = signal(false);
    private _platformId = inject(PLATFORM_ID);

    @Input() intersectionThreshold = 0;

    @Output() intersectionChange = new EventEmitter<boolean>();
    @Output() intersecting = new EventEmitter<void>();
    @Output() notIntersecting = new EventEmitter<void>();

    public readonly isVisible: Signal<boolean> = this._isVisible.asReadonly();

    ngOnInit(): void {
        if (isPlatformBrowser(this._platformId)) {
            this._observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        if (!this._isVisible()) {
                            this._isVisible.set(true);
                            this.intersectionChange.emit(true);
                            this.intersecting.emit();
                        }
                    } else {
                        if (this._isVisible()) {
                            this._isVisible.set(false);
                            this.intersectionChange.emit(false);
                            this.notIntersecting.emit();
                        }
                    }
                },
                { threshold: this.intersectionThreshold }
            );
            this._observer.observe(this._elementRef.nativeElement);
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this._platformId) && this._observer) {
            this._observer.disconnect();
            this._observer = undefined;
        }
    }
}
