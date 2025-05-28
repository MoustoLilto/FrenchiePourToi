import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationFormComponent } from './reservation-form.component';
import { PuppyStore } from '@/core/stores/puppy.store';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { signal } from '@angular/core';

describe('ReservationFormComponent', () => {
    let component: ReservationFormComponent;
    let fixture: ComponentFixture<ReservationFormComponent>;

    beforeEach(async () => {
        const mockPuppyStore = {
            puppies: signal({ data: [], loading: false, error: null }),
        };

        await TestBed.configureTestingModule({
            imports: [ReservationFormComponent, ReactiveFormsModule, CloudinaryImageComponent],
            providers: [{ provide: PuppyStore, useValue: mockPuppyStore }],
        }).compileComponents();

        fixture = TestBed.createComponent(ReservationFormComponent);
        component = fixture.componentInstance;

        // Mock des données
        component.selectedPuppyId = 'test-puppy-id';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with default values', () => {
        expect(component.reservationForm.get('country')?.value).toBe('France');
        expect(component.reservationForm.get('agreeToTerms')?.value).toBe(false);
    });

    it('should validate required fields', () => {
        const form = component.reservationForm;

        expect(form.get('firstName')?.valid).toBeFalsy();
        expect(form.get('lastName')?.valid).toBeFalsy();
        expect(form.get('email')?.valid).toBeFalsy();
        expect(form.get('phone')?.valid).toBeFalsy();
    });

    it('should calculate deposit correctly', () => {
        const price = 1000;
        const deposit = component.calculateDeposit(price);
        expect(deposit).toBe(300);
    });
});
