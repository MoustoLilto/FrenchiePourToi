import {
    Injectable,
    Renderer2,
    RendererFactory2,
    Inject,
    signal,
    effect,
    PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    private renderer: Renderer2;
    private colorSchemeQuery: MediaQueryList | null = null;
    private storageKey = 'theme';

    private _isDark = signal(false);
    public readonly isDark = this._isDark.asReadonly();

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);

        if (isPlatformBrowser(this.platformId)) {
            this.colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.initializeMode();
            this.listenToSystemPreferenceChanges();

            effect(() => {
                this.applyMode(this._isDark());
            });
        }
    }

    toggleDark(): void {
        this._isDark.update((currentValue) => {
            const newValue = !currentValue;
            if (newValue) {
                localStorage.setItem(this.storageKey, 'dark');
            } else {
                localStorage.setItem(this.storageKey, 'light');
            }
            return newValue;
        });
    }

    private initializeMode(): void {
        const savedPreference = localStorage.getItem(this.storageKey);
        let initialIsDark: boolean;

        if (savedPreference && savedPreference === 'dark') {
            initialIsDark = savedPreference === 'dark';
        } else {
            initialIsDark = this.colorSchemeQuery?.matches || false;
        }
        this._isDark.set(initialIsDark);
    }

    private applyMode(isDark: boolean): void {
        if (isDark) {
            this.renderer.addClass(this.document.documentElement, 'dark');
            this.renderer.setAttribute(this.document.documentElement, 'data-theme', 'dark');
        } else {
            this.renderer.removeClass(this.document.documentElement, 'dark');
            this.renderer.setAttribute(this.document.documentElement, 'data-theme', 'light');
        }
    }

    private listenToSystemPreferenceChanges(): void {
        if (this.colorSchemeQuery) {
            this.colorSchemeQuery.addEventListener('change', (event) => {
                const savedPreference = localStorage.getItem(this.storageKey);
                if (savedPreference === null) {
                    localStorage.setItem(this.storageKey, 'auto');
                    this._isDark.set(event.matches);
                }
            });
        }
    }
}
