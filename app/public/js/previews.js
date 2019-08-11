function playAudio(id) { 
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
} 