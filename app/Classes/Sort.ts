import { TrackObject, SearchParameters } from '../types';
import { subtractVectors } from '../Classes/Helper';

function sortResults(searchResults:TrackObject[], sortType:string, searchParams?:SearchParameters) {
  // sort them tracks
  switch(sortType) {
    case 'irrelevance':
      searchResults.reverse();
      break;
    case 'artist_a-z':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        if(trackA.artists[0].name.toLowerCase() < trackB.artists[0].name.toLowerCase()) { return -1; }
        if(trackA.artists[0].name.toLowerCase() > trackB.artists[0].name.toLowerCase()) { return  1; }
        return 0;
      });
      break;
    case 'artist_z-a':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        if(trackA.artists[0].name.toLowerCase() < trackB.artists[0].name.toLowerCase()) { return -1; }
        if(trackA.artists[0].name.toLowerCase() > trackB.artists[0].name.toLowerCase()) { return  1; }
        return 0;
      }).reverse();
      break;
    case 'track_a-z':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        if(trackA.name.toLowerCase() < trackB.name.toLowerCase()) { return -1; }
        if(trackA.name.toLowerCase() > trackB.name.toLowerCase()) { return  1; }
        return 0;
      });
      break;
    case 'track_z-a':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        if(trackA.name.toLowerCase() < trackB.name.toLowerCase()) { return -1; }
        if(trackA.name.toLowerCase() > trackB.name.toLowerCase()) { return  1; }
        return 0;
      }).reverse();
      break;
    case 'poplowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return (trackA.popularity - trackB.popularity)
      });
      break;
    case 'pophightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return (trackB.popularity - trackA.popularity)
      });
      break;
    case 'newest':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return (new Date(trackB.album.release_date).valueOf() - new Date(trackA.album.release_date).valueOf())
      });
      break;
    case 'oldest':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return (new Date(trackA.album.release_date).valueOf() - new Date(trackB.album.release_date).valueOf())
      });
      break;
    case 'durationlowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return trackA.duration_ms - trackB.duration_ms
      });
      break;
    case 'durationhightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return trackB.duration_ms - trackA.duration_ms
      });
      break;
    case 'danceabilitylowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackA.audio_features[0] - trackB.audio_features[0] : 0)
      });
      break;
    case 'danceabilityhightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackB.audio_features[0] - trackA.audio_features[0] : 0)
      });
      break;
    case 'energylowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackA.audio_features[1] - trackB.audio_features[1] : 0)
      });
      break;
    case 'energyhightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackB.audio_features[1] - trackA.audio_features[1] : 0)
      });
      break;
    case 'modelowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackA.audio_features[2] - trackB.audio_features[2] : 0)
      });
      break;
    case 'modehightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackB.audio_features[2] - trackA.audio_features[2] : 0)
      });
      break;
    case 'acousticnesslowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackA.audio_features[3] - trackB.audio_features[3] : 0)
      });
      break;
    case 'acousticnesshightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackB.audio_features[3] - trackA.audio_features[3] : 0)
      });
      break;
    case 'instrumentalnesslowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackA.audio_features[4] - trackB.audio_features[4] : 0)
      });
      break;
    case 'instrumentalnesshightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackB.audio_features[4] - trackA.audio_features[4] : 0)
      });
      break;
    case 'livenesslowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackA.audio_features[5] - trackB.audio_features[5] : 0)
      });
      break;
    case 'livenesshightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackB.audio_features[5] - trackA.audio_features[5] : 0)
      });
      break;
    case 'valencelowtohigh':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackA.audio_features[6] - trackB.audio_features[6] : 0)
      });
      break;
    case 'valencehightolow':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        return ((trackA.audio_features && trackB.audio_features) ? trackB.audio_features[6] - trackA.audio_features[6] : 0)
      });
      break;
    case 'euclidean_near':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        if (trackA.audio_features && trackB.audio_features && searchParams) {
          let differenceA = subtractVectors(trackA.audio_features, searchParams.audioFeatures)
          let distanceA = differenceA.reduce( (acc:number, cur:number) =>  acc + Math.pow(cur,2), 0 );

          let differenceB = subtractVectors(trackB.audio_features, searchParams.audioFeatures)
          let distanceB = differenceB.reduce( (acc:number, cur:number) =>  acc + Math.pow(cur,2), 0 );

          if(distanceA < distanceB) { return -1; }
          if(distanceA > distanceB) { return  1; }
          return 0;
        }
        throw new Error('You must pass SearchParameters object to use this sort method.');
      });
      break;
    case 'euclidean_far':
      searchResults.sort(function(trackA:TrackObject, trackB:TrackObject) {
        if (trackA.audio_features && trackB.audio_features && searchParams) {
          let differenceA = subtractVectors(trackA.audio_features, searchParams.audioFeatures)
          let distanceA = differenceA.reduce( (acc:number, cur:number) =>  acc + Math.pow(cur,2), 0 );

          let differenceB = subtractVectors(trackB.audio_features, searchParams.audioFeatures)
          let distanceB = differenceB.reduce( (acc:number, cur:number) =>  acc + Math.pow(cur,2), 0 );

          if(distanceA < distanceB) { return -1; }
          if(distanceA > distanceB) { return  1; }
          return 0;
        }
        throw new Error('You must pass SearchParameters object to use this sort method.');
      }).reverse();
      break;
  }
  return searchResults;
}

export { sortResults }