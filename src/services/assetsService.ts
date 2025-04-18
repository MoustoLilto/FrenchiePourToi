export const CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL;
export const CLOUDINARY_FOLDER = import.meta.env.CLOUDINARY_FOLDER;

export function getImageUrl(path: string, transformations = 'q_auto,f_auto') {
    return `${CLOUDINARY_URL}/${transformations}/${CLOUDINARY_FOLDER}/${path}`;
}
