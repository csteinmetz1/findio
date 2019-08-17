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
	if (player.paused) {
	  player.play(); 
	  button.innerHTML = "Pause preview";
	}
	else {
	  player.pause(); 
	  button.innerHTML = "Play preview";
	}

	// update now playing
	let albumCover = document.getElementById("cover");
	let artistName = document.getElementById("artist");
	let trackName  = document.getElementById("track");
	albumCover.src = cover;
	artistName.innerHTML = artist;
	trackName.innerHTML = track;
} 