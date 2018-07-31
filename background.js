var apiURL = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=';
var apiURLTrackSearch1 = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&f_music_genre_id='
var apiURLTrackSearch2 = '&f_has_lyrics=1&quorum_factor=1&page_size=100'
var apiKey = '&apikey=5c41136c2d14c8ed00a12d3ff7322211';

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function checkNested(obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}

function removeEmptyStrings (arr) {
	var lyricArray = [];
	for (var i = 0; i < arr.length; i++) {
		var element = arr[i];
		if (element != "") {
			lyricArray.push(element);
		}
	}
	return lyricArray;
}

function generateRandomInteger (min, max) {
	var randomNumber = Math.random() * (max - min) + min;
    var roundedNumber = Math.round(randomNumber);
    return roundedNumber;
}


function getSongName () {
	var counter = 5;
	while (counter > 4) {
		var genreNumberArr = new Array();
		var genreNumberLow = generateRandomInteger(1, 53);
		var genreNumberHigh = generateRandomInteger(1080, 1160);
		genreNumberArr.push(genreNumberLow);
		genreNumberArr.push(genreNumberHigh);
		var genreRandom = genreNumberArr[Math.floor(Math.random() * genreNumberArr.length)];
        var xhttp = new XMLHttpRequest ();
		xhttp.open("GET", apiURLTrackSearch1+genreRandom+apiURLTrackSearch2+apiKey, false);
		xhttp.send(null);
		var responseAPI = xhttp.responseText;
		var responseTrim = responseAPI.substring(9).slice(0, -2);
		responseTrim = JSON.parse(responseTrim);
		var tracks = responseTrim.message.body.track_list;
		var tracksArray = new Array();
		for (var i in tracks)
			tracksArray.push([i, tracks [i]]);
		var randomSelection = tracksArray[Math.floor(Math.random() * tracksArray.length)];
		if (randomSelection !== undefined) {
			return encodeURI(randomSelection[1].track.track_name);
			counter = 1;
			break;
		}
	}
}

function getLyrics(songTitle) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", apiURL + songTitle + apiKey, false);
    xhttp.send(null);
    var responseAPI = xhttp.responseText;
    var responseTrim = responseAPI.substring(9).slice(0, -2);
    var json = JSON.parse(responseTrim);
    var jsonCheck = checkNested(json, 'message', 'body', 'lyrics', 'lyrics_body');
    if (jsonCheck === false) {
        var newSongName = getSongName();
        getLyrics(newSongName);
    } else {
        var lyricsText = json.message.body.lyrics.lyrics_body;
        //console.log('This is lyrics: ' + lyricsText);
        var lyricsArray = lyricsText.split('\n');
        var lyricsArrayTrim = removeEmptyStrings(lyricsArray);
        var lyricString = '';
        for (var z = 0; z < 4; z++) {
            var element = lyricsArrayTrim[z];
            lyricString += element + "\n";
        }
        /*
        if (lyricString.includes('undefined')) {
          var lyricString = '';
          var newSongName = getSongName();
          getLyrics(newSongName);
        }
        */
        return lyricString;
    }
}

