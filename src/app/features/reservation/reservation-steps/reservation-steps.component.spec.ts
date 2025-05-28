import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationStepsComponent } from './reservation-steps.component';

describe('ReservationStepsComponent', () => {
    let component: ReservationStepsComponent;
    let fixture: ComponentFixture<ReservationStepsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReservationStepsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReservationStepsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 4 steps', () => {
        expect(component.steps.length).toBe(4);
    });

    it('should have correct step numbers', () => {
        component.steps.forEach((step, index) => {
            expect(step.number).toBe(index + 1);
        });
    });
});
