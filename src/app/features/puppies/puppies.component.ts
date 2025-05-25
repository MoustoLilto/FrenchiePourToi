import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PuppyStore } from '@/core/stores/puppy.store';
import { PuppyService, PuppyFilters, PuppySortOptions } from '@/core/services/puppy.service';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { LoadingStateComponent } from '@/shared/components/loading-state.component';
import { PaginationComponent } from '@/shared/components/pagination.component';
import { PuppyCardComponent } from '@/features/puppies/puppy-card.component';
import { PuppyFiltersComponent } from '@/features/puppies/puppy-filters.component';
import { Observable } from 'rxjs';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { Puppy } from '@/core/models/puppy.model';
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
export class PuppiesComponent implements OnInit {
    puppyStore = inject(PuppyStore);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    routes = routes;

    // Signaux d'état local
    currentPage = signal(1);
    pageSize = signal(12);
    sortKey = signal('name-asc');

    // Données pour les filtres
    availableColors = ['Fauve', 'Bringé', 'Crème', 'Pied', 'Bleu', 'Chocolat'];
    // availableFeatures = ['LOF', 'Yeux bleus', 'Petite taille', 'Pelage rare', 'Champion', 'Import'];
    skeletonArray = Array(6).fill(0);

    paginatedPuppies = computed(() => {
        const puppies = this.puppyStore.filteredPuppies();
        const page = this.currentPage();
        const size = this.pageSize();
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        return puppies.slice(startIndex, endIndex);
    });

    // constructor(private puppyService: PuppyService) {
    //     this.puppiesState$ = this.puppyService.getAllPuppies();
    // }

    ngOnInit() {
        this.puppyStore.loadAllPuppies();

        this.route.queryParams.subscribe((params) => {
            if (params['page']) {
                this.currentPage.set(parseInt(params['page'], 10));
            }
            if (params['sort']) {
                this.sortKey.set(params['sort']);
                this.applySorting(params['sort']);
            }
            if (params['size']) {
                this.pageSize.set(parseInt(params['size'], 10));
            }
        });
    }

    onSortChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        const sortValue = target.value;
        this.sortKey.set(sortValue);
        this.applySorting(sortValue);
        this.updateUrlParams();
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.updateUrlParams();
        this.scrollToTop();
    }

    onPageSizeChange(size: number) {
        this.pageSize.set(size);
        this.currentPage.set(1); // Retour à la première page lors du changement de taille
        this.updateUrlParams();
    }

    clearFilters() {
        this.puppyStore.clearFilters();
        this.currentPage.set(1);
        this.updateUrlParams();
    }

    reloadPuppies() {
        this.puppyStore.loadAllPuppies();
    }

    private applySorting(sortKey: string) {
        const [field, direction] = sortKey.split('-') as [
            'name' | 'price' | 'birthDate' | 'status',
            'asc' | 'desc',
        ];

        const sortOptions: PuppySortOptions = { field, direction };
        this.puppyStore.updateSortOptions(sortOptions);
    }

    private updateUrlParams() {
        const queryParams: any = {};

        if (this.currentPage() > 1) {
            queryParams.page = this.currentPage();
        }

        if (this.sortKey() !== 'name-asc') {
            queryParams.sort = this.sortKey();
        }

        if (this.pageSize() !== 12) {
            queryParams.size = this.pageSize();
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'merge',
            replaceUrl: true,
        });
    }

    private scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
