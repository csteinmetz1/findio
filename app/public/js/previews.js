function playAudio(id, artist, track, cover) { 
	// pause all currently playing tracks
	var players = document.getElementsByTagName('audio');
	for(i=0; i<players.length; i++) {
	  let playerid = players[i].id.replace('audio', '');
	  if (id != playerid) {
		let button = document.getElementById("button" + playerid);
		button.innerHTML = "Play preview";
		players[i].pause();
	  }
	}
	
	// play the desired track
	let player = document.getElementById("audio" + id); 
	let button = document.getElementById("button" + id);
	let playing = false;	// track wether something is playing
	if (player.paused) {
	  player.play(); 
	  playing = true;
	  button.innerHTML = "Pause preview";
	}
	else {
	  player.pause(); 
	  button.innerHTML = "Play preview";
	  playing = false;
	}

	// update now playing
	let footer     = document.getElementById("footer");
	let albumCover = document.getElementById("cover");
	let artistName = document.getElementById("artist");
	let trackName  = document.getElementById("track");
	let trackUrl   = document.getElementById("trackUrl")

	if (playing) {
	  footer.classList.remove("m-fadeOut");
	  footer.classList.add("m-fadeIn");
	  albumCover.src = cover;
	  artistName.innerHTML = artist;
	  trackName.innerHTML = track;
	  trackUrl.href = "https://open.spotify.com/track/" + id;
	}
	else {
	  footer.classList.remove("m-fadeIn");
	  footer.classList.add("m-fadeOut");
	}
	
} 