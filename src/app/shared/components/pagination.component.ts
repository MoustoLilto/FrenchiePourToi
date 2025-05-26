import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    computed,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="flex items-center justify-between">
            <!-- Informations sur les résultats -->
            <div class="flex-center text-base-content/70 gap-1 text-sm">
                <span i18n="@@pagination.showing">Affichage de</span>
                <span class="font-medium">{{ startItem() }}</span>
                <span i18n="@@pagination.to">à</span>
                <span class="font-medium">{{ endItem() }}</span>
                <span i18n="@@pagination.of">sur</span>
                <span class="font-medium">{{ totalCount() }}</span>
                <span i18n="@@pagination.results">résultats</span>
            </div>

            <!-- Contrôles de pagination -->
            @if (totalPages() > 1) {
                <div class="join">
                    <!-- Bouton Précédent -->
                    <button
                        class="join-item btn btn-sm"
                        [disabled]="currentPage() === 1"
                        (click)="goToPage(currentPage() - 1)"
                        i18n-aria-label="@@pagination.previous.aria-label"
                        aria-label="Page précédente"
                    >
                        <span class="icon-[carbon--chevron-left]"></span>
                        <span i18n="@@pagination.previous.short">Préc</span>
                    </button>

                    <!-- Pages numériques -->
                    @for (page of visiblePages(); track page) {
                        @if (page === '...') {
                            <span class="join-item btn btn-sm btn-disabled">...</span>
                        } @else {
                            <button
                                class="join-item btn btn-sm"
                                [class.btn-active]="page === currentPage()"
                                (click)="goToPage(+page)"
                            >
                                {{ page }}
                            </button>
                        }
                    }

                    <!-- Bouton Suivant -->
                    <button
                        class="join-item btn btn-sm"
                        [disabled]="currentPage() === totalPages()"
                        (click)="goToPage(currentPage() + 1)"
                        i18n-aria-label="@@pagination.next.aria-label"
                        aria-label="Page suivante"
                    >
                        <span i18n="@@pagination.next.short">Suiv</span>
                        <span class="icon-[carbon--chevron-right]"></span>
                    </button>
                </div>
            }
        </div>

        <!-- Sélecteur de taille de page (optionnel) -->
        @if (showPageSizeSelector && currentPage()) {
            <div class="mt-4 flex items-center justify-center gap-2">
                <span class="text-base-content/70 text-sm" i18n="@@pagination.per-page">
                    Éléments par page:
                </span>
                <select
                    class="select select-bordered select-sm w-20"
                    [value]="pageSize()"
                    (change)="onPageSizeChange($event)"
                >
                    <option [value]="pageSize()">{{ pageSize() }}</option>
                    @for (size of pageSizeOptions; track size) {
                        @if (size !== pageSize()) {
                            <option [value]="size">{{ size }}</option>
                        }
                    }
                </select>
            </div>
        }
    `,
})
export class PaginationComponent {
    @Input({ required: true }) set currentPageInput(value: number) {
        this.currentPage.set(value);
    }
    @Input({ required: true }) set totalCountInput(value: number) {
        this.totalCount.set(value);
    }
    @Input({ required: true }) set pageSizeInput(value: number) {
        this.pageSize.set(value);
    }

    @Input() showPageSizeSelector = false;
    @Input() pageSizeOptions: number[] = [6, 12, 24, 48];
    @Input() maxVisiblePages = 7;

    @Output() pageChange = new EventEmitter<number>();
    @Output() pageSizeChange = new EventEmitter<number>();

    currentPage = signal(1);
    totalCount = signal(0);
    pageSize = signal(12);

    totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
    startItem = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
    endItem = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalCount()));

    visiblePages = computed(() => {
        const total = this.totalPages();
        const current = this.currentPage();
        const max = this.maxVisiblePages;

        if (total <= max) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const pages: (string | number)[] = [];
        const halfMax = Math.floor(max / 2);

        // Toujours inclure la première page
        pages.push(1);

        let start: number;
        let end: number;

        if (current <= halfMax + 1) {
            // Proche du début
            start = 2;
            end = max - 1;
        } else if (current >= total - halfMax) {
            // Proche de la fin
            start = total - max + 2;
            end = total - 1;
        } else {
            // Au milieu
            start = current - halfMax + 1;
            end = current + halfMax - 1;
        }

        // Ajouter des points de suspension si nécessaire
        if (start > 2) {
            pages.push('...');
        }

        // Ajouter les pages du milieu
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Ajouter des points de suspension si nécessaire
        if (end < total - 1) {
            pages.push('...');
        }

        // Toujours inclure la dernière page
        if (total > 1) {
            pages.push(total);
        }

        return pages;
    });

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
            this.pageChange.emit(page);
        }
    }

    onPageSizeChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        const newSize = parseInt(target.value, 10);
        this.pageSizeChange.emit(newSize);
    }
}
