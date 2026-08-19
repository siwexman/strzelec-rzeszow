const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.82;
const WEBP_QUALITY = 0.82;

const COMPRESSIBLE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

/** Resizes to MAX_DIMENSION and re-encodes via canvas. Falls back to the
 * original file for types it can't safely re-encode (gif, svg, heic) or if
 * anything goes wrong. */
export async function compressImage(file: File): Promise<File> {
    if (!COMPRESSIBLE_TYPES.has(file.type)) return file;

    try {
        const bitmap = await createImageBitmap(file);
        const scale = Math.min(
            1,
            MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
        );
        const width = Math.round(bitmap.width * scale);
        const height = Math.round(bitmap.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return file;

        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close();

        const quality = file.type === 'image/webp' ? WEBP_QUALITY : JPEG_QUALITY;
        const blob: Blob | null = await new Promise(resolve =>
            canvas.toBlob(resolve, file.type, quality),
        );

        if (!blob || blob.size >= file.size) return file;

        return new File([blob], file.name, {
            type: file.type,
            lastModified: file.lastModified,
        });
    } catch {
        return file;
    }
}

export async function compressImages(files: File[]): Promise<File[]> {
    return Promise.all(files.map(compressImage));
}
