export interface IPhotoJSON {
  next_page: string;

  page: number;

  per_page: number;

  photos: IPhoto[];

  total_results: number;
}

export interface IPhoto {
  alt: string;
  avg_color: string;
  height: number;
  id: number;
  liked: boolean;
  photographer: String;
  photographer_id: number;
  photographer_url: string;
  src: ISource;

  url: string;
  width: number;
}

export interface ISource {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}
