import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CloudinaryService } from '@/services/cloudinary.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cloudinary-image',
    templateUrl: './cloudinary-image.component.html',
    standalone: true,
    imports: [CommonModule],
})
export class CloudinaryImageComponent implements OnChanges {
    @Input() publicId!: string;
    @Input() alt = '';
    @Input() widths: number[] = [300, 600, 900];
    @Input() mainWidth = 800;
    @Input() sizes = '100vw';

    imageUrls: { src: string; srcset: string } | null = null;

    constructor(private cloudinaryService: CloudinaryService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['publicId'] || changes['widths'] || changes['mainWidth'] || changes['sizes']) {
            if (this.publicId) {
                this.imageUrls = this.cloudinaryService.getImageUrlsForSrcset(
                    this.publicId,
                    this.widths,
                    this.mainWidth
                );
            } else {
                this.imageUrls = null;
            }
        }
    }
}
