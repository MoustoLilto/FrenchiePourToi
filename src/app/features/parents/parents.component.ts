import {
    Component,
    OnInit,
    inject,
    signal,
    OnDestroy,
    ViewChild,
    ElementRef,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ParentStore } from '@/core/stores/parents.store';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { LoadingStateComponent } from '@/shared/components/loading-state.component';
import { ParentCardComponent } from '@/features/parents/parent-card.component';
import { routes } from '@/core/constants/routes.constants';
import { Subscription } from 'rxjs';
import { ParentSortOptions } from '@/core/services/parent.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-parents',
    standalone: true,
    imports: [
        CommonModule,
        LoadingStateComponent,
        ParentCardComponent,
        CloudinaryImageComponent,
        RouterLink,
    ],
    templateUrl: './parents.component.html',
})
export class ParentsComponent implements OnInit, OnDestroy {
    parentStore = inject(ParentStore);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    routes = routes;
    skeletonArray = Array(6).fill(0);

    faq = [
        {
            question: $localize`:@@parents.faq.health.question:Quels tests de santé effectuez-vous sur vos reproducteurs ?`,
            answer: $localize`:@@parents.faq.health.answer:Tous nos reproducteurs sont testés pour les principales maladies génétiques du Bouledogue Français : DM (Myélopathie dégénérative), IVDD (Discopathie intervertébrale), HUU (Hyperuricosurie), et CMR1 (Curly coat/Dry eye). Nous effectuons également des examens vétérinaires réguliers incluant radiographies des hanches et coudes, examens cardiaques et ophtalmologiques.`,
        },
        {
            question: $localize`:@@parents.faq.breeding.question:À quelle fréquence vos reproducteurs ont-ils des portées ?`,
            answer: $localize`:@@parents.faq.breeding.answer:Nous respectons le bien-être de nos reproductrices en limitant le nombre de portées. Une femelle n'a généralement qu'une portée par an, et nous veillons à ce qu'elle soit en parfaite santé avant chaque saillie. Nos reproducteurs sont suivis par notre vétérinaire tout au long de leur vie reproductive.`,
        },
        {
            question: $localize`:@@parents.faq.lineage.question:Puis-je connaître la lignée de mon futur chiot ?`,
            answer: $localize`:@@parents.faq.lineage.answer:Absolument ! Nous fournissons le pedigree complet sur plusieurs générations, incluant les certificats LOF des parents et grands-parents. Vous pouvez également rencontrer les parents lors de votre visite et consulter leurs résultats aux tests de santé.`,
        },
    ];

    private defaultSortKey = 'name-asc';
    private defaultSearchQuery = '';

    sortKey = signal(this.defaultSortKey);
    searchQuery = signal(this.defaultSearchQuery);

    queryParamsSub$: Subscription | undefined;

    @ViewChild('searchInput') searchInput!: ElementRef;
    private keydownListener!: (event: KeyboardEvent) => void;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    ngOnInit() {
        this.parentStore.loadAllParents();

        this.queryParamsSub$ = this.route.queryParams.subscribe((params) => {
            const sort = params['sort'] || this.defaultSortKey;
            const search = params['search'] || this.defaultSearchQuery;

            if (this.sortKey() !== sort) {
                this.sortKey.set(sort);
                this.applySorting(sort);
            }
            if (this.searchQuery() !== search) {
                this.searchQuery.set(search);
                this.parentStore.updateSearchQuery(search);
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            this.keydownListener = (event: KeyboardEvent) => this.onKeydown(event);
            document.addEventListener('keydown', this.keydownListener);
        }
    }
    ngOnDestroy() {
        if (this.queryParamsSub$) {
            this.queryParamsSub$.unsubscribe();
        }
        if (isPlatformBrowser(this.platformId)) {
            document.removeEventListener('keydown', this.keydownListener);
        }
    }

    onSortChange(event: Event) {
        const sortValue = (event.target as HTMLSelectElement).value;
        this.updateUrlParams({ sort: sortValue });
    }
    onSearchChange(event: Event): void {
        const query = (event.target as HTMLInputElement).value;
        this.updateUrlParams({ search: query });
    }
    onKeydown(event: KeyboardEvent) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault();
            this.searchInput.nativeElement.focus();
        }
    }

    clearSearch(): void {
        this.updateUrlParams({ search: '' });
    }

    // Helpers
    private applySorting(sortKey: string) {
        const [field, direction] = sortKey.split('-') as [
            'name' | 'birthDate' | 'color',
            'asc' | 'desc',
        ];
        const sortOptions: ParentSortOptions = { field, direction };
        this.parentStore.updateSortOptions(sortOptions);
    }

    private updateUrlParams(changes: Partial<{ sort: string; search: string }>) {
        const sort = changes.sort ?? this.sortKey();
        const search = changes.search ?? this.searchQuery();

        // Construit les queryParams en excluant les valeurs par défaut
        const queryParams: Record<string, string> = {};

        if (search) {
            queryParams['search'] = search;
        }
        if (sort !== this.defaultSortKey) {
            queryParams['sort'] = sort;
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
            queryParamsHandling: 'replace',
            replaceUrl: false,
        });
    }
}
