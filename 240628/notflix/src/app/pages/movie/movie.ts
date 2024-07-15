export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  homepage: string;
}

export interface Cast {
  profile_path: string;
  name: string;
  character: string;
}

export interface Video {
  key: string;
  site: string;
  type: string;
}

export interface Poster {
  file_path: string;
}