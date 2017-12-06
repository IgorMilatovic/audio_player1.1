

//********************    AUDIO PLAYER    ***********************

var $ = selector => document.querySelector(selector);

// niz naziva pesama
var songsArr = ['Alabama Shakes - Dont Wanna Fight', 'Blue Ridge Mountains - Fleet Foxes', 'Editors - The Phone Book', 'Fly Boy Blue - Elbow', 'For 12 - Other Lives', 'In the morning -Fleet Foxes', 'Magnificent -Elbow', 'Mykonos - Fleet Foxes', 'Shearwater - Backchannels', 'The Beach Boys - Good Vibrations'];

const playSong = $('#play');

const pauseSong = $('.pause');

const stopSong = $('.stop');

const playNext = $('#next');

const playPrev = $('#prev');

const volSlider = $('.volume_slider');

const buttonActive = $('.button');

const muteButton = $('.mute');

const soundIcon = $('.sound_icon');
soundIcon.setAttribute('src', 'sound.png');

const songsList = $('.songs_holder');

const seekSlider = $('#seekslider');

const curtimetext = $("#curtimetext");

const durtimetext = $("#durtimetext");

// niz koji prima src-e pesama
var songsSrc = [];

// petlja za ubacivanje rednog broja i naziva pesama u player, ubacivanje src-a pesama u niz
for (let i = 0; i < songsArr.length; i++) {

	// pravljenje niza src-a pesama
	songsSrc.push(songsArr[i] + '.mp3');

	// redni broj pesme u listi
	if (i < 9) {
		var songNumber = document.createTextNode('0' + (i + 1) + '. ');
    }

    else {
    	var songNumber = document.createTextNode((i + 1) + '. ');
    }//

	// ubacivanje naziva pesme sa rednim brojem u listu
	var songDiv = document.createElement('div');
	songDiv.setAttribute('class', 'pusti_pesmu' + i);
	songDiv.style.cursor = 'pointer';

	var songParagraph = document.createElement('p');
	songParagraph.setAttribute('class', 'song_' + i);

	var songNumberHolder = document.createElement('span');
	songNumberHolder.appendChild(songNumber);

	var songName = document.createTextNode(songsArr[i]);
	songParagraph.appendChild(songName);
	songParagraph.style.display = 'inline';

	songDiv.appendChild(songNumberHolder);
	songDiv.appendChild(songParagraph);

	songDiv.style.margin = '5px';

	songsList.appendChild(songDiv);//
} // KRAJ PETLJE

// NEW AUDIO
const zvuk = new Audio();

//POMOCNIK 'N'
var n = 0;

// FUNCTIONS ////////////////////////////////////////////////////////////////////
function pustiPesmu() {

	zvuk.src = songsSrc[n];

	playSong.classList.add('play_button_colour')

	stopSong.classList.remove('stop_button_colour')

	pauseSong.classList.remove('pause_button_colour')

	// if (zvuk.pauzirajPesmu) {
	// 	zvuk.currentTime
    // }

	zvuk.play()
}

function pauzirajPesmu() {

	if (!zvuk.paused) {

		zvuk.pause()

		pauseSong.classList.add('pause_button_colour')

		playSong.classList.remove('play_button_colour')

	}

    else if (zvuk.currentTime == 0) {

    	zaustaviPesmu()

    	pauseSong.classList.remove('pause_button_colour')

		playSong.classList.remove('play_button_colour')

		stopSong.classList.remove('stop_button_colour')
    }

    else {

    	zvuk.currentTime

    	zvuk.play()

		pauseSong.classList.remove('pause_button_colour')

    	playSong.classList.add('play_button_colour')
    }
}

function zaustaviPesmu() {

	zvuk.pause()

	zvuk.currentTime = 0

	stopSong.classList.add('stop_button_colour')

	pauseSong.classList.remove('pause_button_colour')

	playSong.classList.remove('play_button_colour')
}

function pustiSledecuPesmu() {

	stopSong.classList.remove('stop_button_colour')

	pauseSong.classList.remove('pause_button_colour')

	if (n == songsSrc.length - 1) {
		n = 0
	}

	else {
		n = n + 1
	}

	pustiPesmu()

	playSong.classList.add('play_button_colour')
}

function pustiPrethodnuPesmu() {

	stopSong.classList.remove('stop_button_colour')

	pauseSong.classList.remove('pause_button_colour')

	if (n == 0) {
		n = songsSrc.length -1;
	}

	else {
		n = n - 1;
	}

	pustiPesmu()

	playSong.classList.add('play_button_colour')
}

function mute() {

	if (zvuk.muted == false) {

    	zvuk.muted = true;

    	soundIcon.setAttribute('src', 'sound_mute.png');
    	soundIcon.style.background = '#ff4d4d';

    	muteButton.style.background = 'darkorange';
    }

	else {

		zvuk.muted = false;

		soundIcon.removeAttribute('src', 'sound_mute.png')

		soundIcon.setAttribute('src', 'sound.png')

		muteButton.style.background = 'lightgray'

		soundIcon.style.background = 'lightgray'

		if (zvuk.currentTime != 0) {

			playSong.classList.add('play_button_colour')
		}
	}
}

function jacinaZvuka() {

	zvuk.volume = volSlider.value / 100
}

//proteklo i preostalo vreme pesme
function seektimeupdate() {

	var curmins = Math.floor(zvuk.currentTime / 60);

	var cursecs = Math.floor(zvuk.currentTime - curmins * 60);

	var durmins = Math.floor(zvuk.duration / 60);

	var dursecs = Math.floor(zvuk.duration - durmins * 60);

	if (cursecs < 10) {
		cursecs = "0" + cursecs;
	}

	if (dursecs < 10) {
		dursecs = "0" + dursecs;
	}

	if (curmins < 10) {
		curmins = "0" + curmins;
	}

	if (durmins < 10) {
		durmins = "0" + durmins;
	}

	curtimetext.innerHTML = curmins + " : " + cursecs;

	durtimetext.innerHTML = durmins + " : " + dursecs;
}

function sledecaPesmaLoopList() {

	n ++

	if (n >= songsSrc.length) {
		n = 0
	}

	pustiPesmu()
}

// pozadina za svirajucu pesmu
function bojaPesme() {

	for (var i = 0; i < songsSrc.length; i++) {

		$('.pusti_pesmu' + i).classList.remove('playing_song')
	}

	$('.pusti_pesmu' + n).classList.add('playing_song')
}
// KRAJ FUNKCIJA

// *** PETLJA ZA PUSTANJE PESME KLIKOM NA IME PESME U LISTI + OBOJENA POZADINA NA KLIK NA PESMU*** //
for (let i = 0; i < songsSrc.length; i++) {

	$('.pusti_pesmu' + i).addEventListener('click', function() {

		zvuk.src = songsSrc[i];

		for (let i = 0; i < songsSrc.length; i++) {

			$('.pusti_pesmu' + i).classList.remove('playing_song')
		}

		n = i;

		$('.pusti_pesmu' + n).classList.add('playing_song')

		playSong.classList.add('play_button_colour')

		stopSong.classList.remove('stop_button_colour')

		pauseSong.classList.remove('pause_button_colour')

		zvuk.play()
	})
}// *** KRAJ PETLJE *** //

//  EVENT LISTENERS   ////////////////////////////////////////////////////////////////////
playSong.addEventListener('click', pustiPesmu)

pauseSong.addEventListener('click', pauzirajPesmu)

stopSong.addEventListener('click', zaustaviPesmu)

playNext.addEventListener('click', pustiSledecuPesmu)

// boja next buttona samo na mousedown
playNext.addEventListener('mouseover', function () {

	playNext.addEventListener('mousedown', function() {
		playNext.classList.add('prev_next')
	})

	playNext.addEventListener('mouseup', function() {
		playNext.classList.remove('prev_next')
	})
})

// boja prev buttona samo na mousedown
playPrev.addEventListener('click', pustiPrethodnuPesmu)

playPrev.addEventListener('mouseover', function () {

	playPrev.addEventListener('mousedown', function() {
		playPrev.classList.add('prev_next')
	})

	playPrev.addEventListener('mouseup', function() {
		playPrev.classList.remove('prev_next')
	})
});//

muteButton.addEventListener('click', mute)

volSlider.addEventListener('mousemove', jacinaZvuka)

/// seek bar / vreme
zvuk.addEventListener('play', function() {

	//izbegavanje ispisa Nan na blic prilikom pocetka pesme
	zvuk.addEventListener('loadedmetadata', seektimeupdate);//

	zvuk.onloadedmetadata = () => seekSlider.max = zvuk.duration

	seekSlider.onchange = () => zvuk.currentTime = seekSlider.value

	zvuk.ontimeupdate = () => seekSlider.value = zvuk.currentTime

	zvuk.addEventListener("timeupdate", seektimeupdate);
})///

// vracanje seek bara na 0 na kraj pesme i na ucitan prozor
zvuk.addEventListener('ended', function() {
	seekSlider.value = 0
})

window.addEventListener('load', function() {
	seekSlider.value = 0
})//

// sledeca pesma na onended i looping liste
zvuk.addEventListener('ended', sledecaPesmaLoopList)

// pozadina za svirajucu pesmu
zvuk.addEventListener('play', bojaPesme)

/////// KRAJ /////////////////////////////////////////////////////////////////////////
