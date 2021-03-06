import { release } from "os";

// Our Interface

interface SearchParameters {
	query: string;
  yearRange: string[];
  genre: string;
  explicit: string;
  durationRange: number[];
	popularityRange: number[];
	audioFeatures: number[];
	audioFeatureTolerance: number;
  depth: number;
  sort: string;
	offset: number;
}

// Spotify Web API Interfaces

interface ExternalUrlObject {
  spotify: string
}

interface ExternalIdObject {
  isrc?: string,
  ean?: string,
  upc?: string
}

interface ImageObject {
  height?: number,
  url: string,
  width?: number
}

interface TrackLinkObject {
  external_urls: ExternalUrlObject,
  href: string,
  id: string,
  type: "track",
  uri: string
}

interface ArtistObject {
  external_urls: ExternalUrlObject,
  href: string,
  id: string,
  name: string,
  type: "artist",
  uri: string
}

interface AlbumObject {
  album_type: string,
  available_markets?: string[],
  external_urls: ExternalUrlObject,
  href: string,
  id: string,
  images: ImageObject[],
  name: string,
  release_date: string;
  release_date_precision: string;
  type: "album",
  uri: string
}

interface TrackObject {
  artists: ArtistObject[],
  available_markets?: string[],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_urls: ExternalUrlObject,
  href: string,
  id: string,
  is_playable?: boolean,
  linked_from?: TrackLinkObject,
  name: string,
  preview_url: string,
  track_number: number,
  type: "track",
  uri: string
  album: AlbumObject,
  external_ids: ExternalIdObject,
  popularity: number,
  audio_features?: number[]; 
}

interface AudioFeaturesObject {
  acousticness: number,
  analysis_url: string,
  danceability: number,
  duration_ms: number,
  energy: number,
  id: string,
  instrumentalness: number,
  key: number,
  liveness: number,
  loudness: number,
  mode: number,
  speechiness: number,
  tempo: number,
  time_signature: number,
  track_href: string,
  type: "audio_features",
  uri: string,
  valence: number
}

interface SearchDetails {
  totalTracks: number,
  totalFilteredTracks: number,
  filteredByAudioFeatures: number,
  filteredByPopularity: number,
  filteredByDuration: number,
  filteredByExplicit: number
  [key: string]: number // not sure exactly what this does
}

interface SearchResults {
  trackObjects: TrackObject[],
  searchDetails: SearchDetails
}

export { SearchParameters, SearchResults, SearchDetails, TrackObject, AudioFeaturesObject }