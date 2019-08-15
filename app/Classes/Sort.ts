import { TrackObject } from '../types';

function sortResults(searchResults:TrackObject[], sortType:string) {
  // sort them tracks
  switch(sortType) {
    case 'irrelevance':
      searchResults.reverse();
      break;
    case 'poplowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return (trackA.popularity - trackB.popularity)});
      break;
    case 'pophightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return (trackB.popularity - trackA.popularity)});
      break;
    case 'newest':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return (new Date(trackB.album.release_date).valueOf() - new Date(trackA.album.release_date).valueOf())});
      break;
    case 'oldest':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return (new Date(trackA.album.release_date).valueOf() - new Date(trackB.album.release_date).valueOf())});
      break;
    case 'durationlowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.duration_ms - trackB.duration_ms});
      break;
    case 'durationhightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.duration_ms - trackA.duration_ms});
      break;
    case 'danceabilitylowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.audio_features[0] - trackB.audio_features[0]});
      break;
    case 'danceabilityhightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.audio_features[0] - trackA.audio_features[0]});
      break;
    case 'energylowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.audio_features[1] - trackB.audio_features[1]});
      break;
    case 'energyhightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.audio_features[1] - trackA.audio_features[1]});
      break;
    case 'modelowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.audio_features[2] - trackB.audio_features[2]});
      break;
    case 'modehightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.audio_features[2] - trackA.audio_features[2]});
      break;
    case 'acousticnesslowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.audio_features[3] - trackB.audio_features[3]});
      break;
    case 'acousticnesshightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.audio_features[3] - trackA.audio_features[3]});
      break;
    case 'instrumentalnesslowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.audio_features[4] - trackB.audio_features[4]});
      break;
    case 'instrumentalnesshightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.audio_features[4] - trackA.audio_features[4]});
      break;
    case 'livenesslowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.audio_features[5] - trackB.audio_features[5]});
      break;
    case 'livenesshightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.audio_features[5] - trackA.audio_features[5]});
      break;
    case 'valencelowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackA.audio_features[6] - trackB.audio_features[6]});
      break;
    case 'valencehightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {return trackB.audio_features[6] - trackA.audio_features[6]});
      break;
  }
  return searchResults;
}

export { sortResults }