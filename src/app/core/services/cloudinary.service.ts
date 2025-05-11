import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage, CloudinaryVideo } from '@cloudinary/url-gen';
import { fill, scale, auto } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { sepia } from '@cloudinary/url-gen/actions/effect';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { environment } from '~/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CloudinaryService {
    private cld: Cloudinary;

    constructor() {
        this.cld = new Cloudinary({
            cloud: {
                cloudName: environment.cloudinary.cloudName,
            },
            url: { secure: true },
        });
    }

    // Image de chiot pour la liste
    getChiotListImage(publicId: string): CloudinaryImage {
        return this.applyBaseOptimizations(
            this.cld.image(publicId).resize(fill().width(300).height(200).gravity(autoGravity()))
        );
    }

    // Image détaillée de chiot
    getChiotDetailImage(publicId: string): CloudinaryImage {
        return this.applyBaseOptimizations(this.cld.image(publicId).resize(scale().width(800)));
    }

    // Image de profil de chiot optimisée
    getChiotProfileImage(publicId: string): CloudinaryImage {
        return (
            this.cld
                .image(publicId)
                .resize(fill().width(500).height(400).gravity(autoGravity()))
                // .roundCorners(byRadius(20))
                // .effect(improve())
                .format('auto')
                .quality('auto')
        );
    }

    // Image miniature pour galerie
    getChiotThumbnail(publicId: string): CloudinaryImage {
        return (
            this.cld
                .image(publicId)
                .resize(fill().width(150).height(150))
                // .gravity(autoGravity()))
                // .roundCorners(byRadius(10))
                .format('auto')
                .quality('auto')
        );
    }

    // Vidéo du chiot
    getChiotVideo(publicId: string): CloudinaryVideo {
        return this.cld
            .video(publicId)
            .resize(fill().width(640).height(360))
            .format('auto')
            .quality('auto');
    }

    // Nouvelle méthode pour générer srcset (exemple)
    generateSrcset(publicId: string, widths: number[]): string {
        // Appliquez les transformations de base ou spécifiques si nécessaire
        let baseImage = this.cld.image(publicId);
        baseImage = this.applyBaseOptimizations(baseImage); // Applique les optimisations auto

        // Génère les URLs pour les largeurs spécifiées
        const srcsetUrls = widths.map(
            (width) => `${baseImage.resize(scale().width(width)).toURL()} ${width}w`
        );

        return srcsetUrls.join(', ');
    }

    // Nouvelle méthode pour obtenir l'URL principale pour srcset (optionnel, souvent la plus grande)
    getMainImageUrl(publicId: string, maxWidth: number): string {
        let mainImage = this.cld.image(publicId);
        mainImage = this.applyBaseOptimizations(mainImage);
        // Applique une transformation de redimensionnement pour la taille principale
        return mainImage.resize(scale().width(maxWidth)).toURL();
    }

    // Alternative: utiliser une seule méthode qui retourne un objet avec src et srcset
    getImageUrlsForSrcset(
        publicId: string,
        widths: number[],
        mainMaxWidth: number
    ): { src: string; srcset: string } {
        const srcset = this.generateSrcset(publicId, widths);
        const src = this.getMainImageUrl(publicId, mainMaxWidth);
        return { src, srcset };
    }

    // Méthode pour obtenir un placeholder flou
    getPlaceholderUrl(publicId: string): string {
        let placeholderImage = this.cld.image(publicId);
        // Appliquez une transformation légère (flou, petite taille)
        placeholderImage = placeholderImage
            .resize(scale().width(50)) // Petite taille
            .effect(sepia()); // Exemple de transformation simple pour placeholder
        // .quality('auto:low'); // Qualité très basse

        return placeholderImage.toURL();
    }

    // Pour les transformations personnalisées
    getCloudinary(): Cloudinary {
        return this.cld;
    }

    // Transformations standards avec paramètres DRY
    private applyBaseOptimizations(image: CloudinaryImage): CloudinaryImage {
        return image.format('auto').quality('auto:good');
    }
}
