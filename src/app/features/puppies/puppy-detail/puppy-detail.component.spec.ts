import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppyDetailComponent } from './puppy-detail.component';

describe('PuppyDetailComponent', () => {
    let component: PuppyDetailComponent;
    let fixture: ComponentFixture<PuppyDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PuppyDetailComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PuppyDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
