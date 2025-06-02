import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuppyDetailComponent } from './puppy-detail.component';
import { ActivatedRoute } from '@angular/router';

describe('PuppyDetailComponent', () => {
    let component: PuppyDetailComponent;
    let fixture: ComponentFixture<PuppyDetailComponent>;

    const mockActivatedRoute = {
        snapshot: {
            paramMap: {
                get: (key: string) => (key === 'id' ? 'bella-2024-001' : null),
            },
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PuppyDetailComponent],
            providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
        }).compileComponents();

        fixture = TestBed.createComponent(PuppyDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
