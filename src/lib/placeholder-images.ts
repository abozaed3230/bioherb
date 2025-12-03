import data from './placeholder-images.json';

export type MediaPlaceholder = {
  id: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  imageHint: string;
};

export const PlaceHolderImages: MediaPlaceholder[] = data.placeholderImages;
