export interface Response {
  photos: Photo[];
}

export interface Camera {
  full_name: string;
}

export interface Photo {
  img_src: string;
  earth_date: string;
  sol: number;
  camera: Camera;
}
