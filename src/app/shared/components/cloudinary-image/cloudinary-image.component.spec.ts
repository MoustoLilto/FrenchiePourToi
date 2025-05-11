import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';

describe('CloudinaryImageComponent', () => {
    let component: CloudinaryImageComponent;
    let fixture: ComponentFixture<CloudinaryImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CloudinaryImageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CloudinaryImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
