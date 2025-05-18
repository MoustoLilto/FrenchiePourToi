import {
    Directive,
    EventEmitter,
    HostListener,
    Inject,
    Output,
    PLATFORM_ID,
    signal,
    Signal,
    computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appScrollListener]',
    exportAs: 'scrollListener',
    standalone: true,
})
export class ScrollListenerDirective {
    private _isBrowser: boolean;
    private _scrollY = signal(0);
    private _previousScrollY = 0;

    @Output() scrollDown = new EventEmitter<void>();
    @Output() scrollUp = new EventEmitter<void>();

    public readonly scrollY: Signal<number> = this._scrollY.asReadonly();
    public readonly isAtTop: Signal<boolean> = computed(() => this._scrollY() === 0);
    public readonly hasExceededScreenHeight: Signal<boolean> = computed(() => {
        return this._isBrowser && this._scrollY() > window.innerHeight;
    });

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this._isBrowser = isPlatformBrowser(this.platformId);

        if (this._isBrowser) {
            const initialScrollY = window.scrollY;
            this._scrollY.set(initialScrollY);
            this._previousScrollY = initialScrollY;
        }
    }

    @HostListener('window:scroll')
    onScroll(): void {
        if (this._isBrowser) {
            const currentScrollY = window.scrollY;
            this._scrollY.set(currentScrollY);

            if (currentScrollY > this._previousScrollY) {
                this.scrollDown.emit();
            } else if (currentScrollY < this._previousScrollY) {
                this.scrollUp.emit();
            }
            this._previousScrollY = currentScrollY;
        }
    }
}
