import { Component, OnInit, inject, computed, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PuppyStore } from '@/core/stores/puppy.store';
import {
    PuppySortOptions,
    PuppySortField,
    PuppySortDirection,
} from '@/core/services/puppy.service';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { LoadingStateComponent } from '@/shared/components/loading-state.component';
import { PaginationComponent } from '@/shared/components/pagination.component';
import { PuppyCardComponent } from '@/features/puppies/puppy-card.component';
import { PuppyFiltersComponent } from '@/features/puppies/puppy-filters.component';
import { Subscription } from 'rxjs';
import { routes } from '@/core/constants/routes.constants';

@Component({
    selector: 'app-puppies',
    standalone: true,
    imports: [
        CommonModule,
        LoadingStateComponent,
        PuppyCardComponent,
        PuppyFiltersComponent,
        PaginationComponent,
        CloudinaryImageComponent,
        RouterLink,
    ],
    templateUrl: './puppies.component.html',
})
export class PuppiesComponent implements OnInit, OnDestroy {
    puppyStore = inject(PuppyStore);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    routes = routes;
    skeletonArray = Array(6).fill(0);
    nextLitters = [
        {
            expectedDate: 'juin 2023',
            female: 'Luna',
            male: 'Max',
            releaseDate: 'août 2023',
        },
        {
            expectedDate: 'septembre 2023',
            releaseDate: 'novembre 2023',
            female: 'Bella',
            male: 'Oscar',
        },
    ];
    faq = [
        {
            question: $localize`:@@puppies.faq.reserve.question:Comment réserver un chiot ?`,
            answer: $localize`:@@puppies.faq.reserve.answer:Pour réserver un chiot, vous pouvez nous contacter par téléphone, email ou via notre formulaire de contact. Un acompte de 30% du prix du chiot est demandé pour confirmer la réservation. Le solde est à régler lors de la remise du chiot.`,
        },
        {
            question: $localize`:@@puppies.faq.age.question:À quel âge les chiots sont-ils disponibles ?`,
            answer: $localize`:@@puppies.faq.age.answer:Nos chiots sont disponibles à partir de 8 semaines, âge légal minimum pour la cession d'un chiot. Cela leur permet de rester suffisamment longtemps avec leur mère et leurs frères et sœurs pour une bonne socialisation.`,
        },
        {
            question: $localize`:@@puppies.faq.documents.question:Quels documents sont fournis avec le chiot ?`,
            answer: $localize`:@@puppies.faq.documents.answer:Chaque chiot est vendu avec un certificat de bonne santé délivré par notre vétérinaire, un carnet de santé à jour des vaccinations, une puce électronique, un certificat de naissance LOF (si applicable), un contrat de vente et une garantie écrite.`,
        },
    ];

    private defaultSortKey = 'name-asc';
    private defaultPageSize = 12;
    private defaultPage = 1;

    // Signaux d'état local synchronisés uniquement via l'URL
    currentPage = signal(this.defaultPage);
    pageSize = signal(this.defaultPageSize);
    sortKey = signal(this.defaultSortKey);

    paginatedPuppies = computed(() => {
        const size = this.pageSize();
        const startIndex = (this.currentPage() - 1) * size;
        const endIndex = startIndex + size;
        return this.puppyStore.filteredPuppies().slice(startIndex, endIndex);
    });

    availableColors = computed(() => {
        const puppies = this.puppyStore.puppies().data;
        if (this.puppyStore.isPuppiesLoaded() && puppies) {
            return [...new Set(puppies.map((puppy) => puppy.color))];
        }
        return [];
    });
    // availableFeatures = ['LOF', 'Yeux bleus', 'Petite taille', 'Pelage rare', 'Champion', 'Import'];

    queryParamsSub$: Subscription | undefined;

    ngOnInit() {
        this.puppyStore.loadAllPuppies();

        // Souscription unique aux queryParams
        this.queryParamsSub$ = this.route.queryParams.subscribe((params) => {
            // Synchronise signaux et store à partir de l'URL
            const page = params['page'] ? parseInt(params['page'], 10) : this.defaultPage;
            const size = params['size'] ? parseInt(params['size'], 10) : this.defaultPageSize;
            const sort = params['sort'] || this.defaultSortKey;

            // Met à jour les signaux uniquement si la valeur change
            if (this.currentPage() !== page) this.currentPage.set(page);
            if (this.pageSize() !== size) this.pageSize.set(size);
            if (this.sortKey() !== sort) {
                this.sortKey.set(sort);
                this.applySorting(sort);
            }
        });
    }

    ngOnDestroy() {
        if (this.queryParamsSub$) {
            this.queryParamsSub$.unsubscribe();
        }
    }

    // Listeners
    onSortChange(event: Event) {
        const sortValue = (event.target as HTMLSelectElement).value;
        this.updateUrlParams({ sort: sortValue, page: 1 });
    }
    onPageChange(page: number) {
        this.updateUrlParams({ page });
        this.scrollToTop();
    }
    onPageSizeChange(size: number) {
        this.updateUrlParams({ size, page: 1 });
        this.scrollToTop();
    }

    // Actions
    clearFilters() {
        this.puppyStore.clearFilters();
        this.updateUrlParams({ page: 1 });
    }

    // Helpers
    private applySorting(sortKey: string) {
        const [field, direction] = sortKey.split('-') as [PuppySortField, PuppySortDirection];
        const sortOptions: PuppySortOptions = { field, direction };
        this.puppyStore.updateSortOptions(sortOptions);
    }
    private updateUrlParams(changes: Partial<{ page: number; sort: string; size: number }>) {
        const queryParams = {
            page: changes.page ?? this.currentPage(),
            sort: changes.sort ?? this.sortKey(),
            size: changes.size ?? this.pageSize(),
        };

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }

    private scrollToTop() {
        setTimeout(() => {
            const puppiesGrid = document.querySelector('#puppies-grid');
            if (puppiesGrid) {
                puppiesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
}
