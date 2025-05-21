import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialMiniatureComponent } from './testimonial-miniature.component';

describe('TestimonialMiniatureComponent', () => {
    let component: TestimonialMiniatureComponent;
    let fixture: ComponentFixture<TestimonialMiniatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestimonialMiniatureComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestimonialMiniatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
