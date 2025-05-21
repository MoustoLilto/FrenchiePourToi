import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupiesSectionComponent } from './pupies-section.component';

describe('PupiesSectionComponent', () => {
    let component: PupiesSectionComponent;
    let fixture: ComponentFixture<PupiesSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PupiesSectionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PupiesSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
