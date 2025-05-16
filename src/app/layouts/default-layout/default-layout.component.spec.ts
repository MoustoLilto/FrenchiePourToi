import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DefaultLayoutComponent } from './default-layout.component';

describe('DefaultLayoutComponent', () => {
    let component: DefaultLayoutComponent;
    let fixture: ComponentFixture<DefaultLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DefaultLayoutComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(DefaultLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
