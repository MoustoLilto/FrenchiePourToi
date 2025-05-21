import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppyMiniatureComponent } from './puppy-miniature.component';

describe('PuppyMiniatureComponent', () => {
    let component: PuppyMiniatureComponent;
    let fixture: ComponentFixture<PuppyMiniatureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PuppyMiniatureComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PuppyMiniatureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
