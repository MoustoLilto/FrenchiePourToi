import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationFaqComponent } from './reservation-faq.component';

describe('ReservationFaqComponent', () => {
    let component: ReservationFaqComponent;
    let fixture: ComponentFixture<ReservationFaqComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReservationFaqComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReservationFaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have FAQ items', () => {
        expect(component.faqs.length).toBeGreaterThan(0);
    });

    it('should have unique FAQ ids', () => {
        const ids = component.faqs.map((faq) => faq.id);
        const uniqueIds = [...new Set(ids)];
        expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have questions and answers for each FAQ', () => {
        component.faqs.forEach((faq) => {
            expect(faq.question).toBeTruthy();
            expect(faq.answer).toBeTruthy();
        });
    });
});
