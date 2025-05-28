import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationComponent } from './reservation.component';
import { PuppyStore } from '@/core/stores/puppy.store';
import { RouterTestingModule } from '@angular/router/testing';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { LoadingStateComponent } from '@/shared/components/loading-state.component';
import { signal } from '@angular/core';

describe('ReservationComponent', () => {
    let component: ReservationComponent;
    let fixture: ComponentFixture<ReservationComponent>;

    beforeEach(async () => {
        const mockPuppyStore = {
            puppies: signal({ data: [], loading: false, error: null }),
            loadAllPuppies: jasmine.createSpy('loadAllPuppies'),
        };

        await TestBed.configureTestingModule({
            imports: [
                ReservationComponent,
                RouterTestingModule,
                CloudinaryImageComponent,
                LoadingStateComponent,
            ],
            providers: [{ provide: PuppyStore, useValue: mockPuppyStore }],
        }).compileComponents();

        fixture = TestBed.createComponent(ReservationComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select puppy', () => {
        const puppyId = 'test-puppy-id';
        component.selectPuppy(puppyId);
        expect(component.selectedPuppyId()).toBe(puppyId);
    });

    it('should cancel reservation', () => {
        component.selectedPuppyId.set('test-puppy-id');
        component.onReservationCancelled();
        expect(component.selectedPuppyId()).toBeNull();
    });
});
