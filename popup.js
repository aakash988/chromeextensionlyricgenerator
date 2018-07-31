document.getElementById("changelyrics").addEventListener("click", function() {
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
        var x = backgroundPage.getSongName();
        var lyricsForSong = backgroundPage.getLyrics(x);
        while (lyricsForSong == undefined || lyricsForSong == "" || lyricsForSong.includes("undefined")) {
            x = backgroundPage.getSongName();
            lyricsForSong = backgroundPage.getLyrics(x);
        }
        var decodedURL = decodeURIComponent(x);
       	document.getElementById("songtitle").innerHTML = "Song Title: " + decodedURL;
        document.getElementById("lyrics").innerHTML = "Lyrics: " + lyricsForSong;
        document.getElementById("searchsongonyoutube").style.visibility="visible";
        document.getElementById("searchsongonspotify").style.visibility="visible";
    })
})


window.addEventListener('DOMContentLoaded', function() {
	var newLink = document.getElementById("searchsongonyoutube");
	newLink.addEventListener('click', function() {
		var songNameTitle = document.getElementById("songtitle").innerHTML;
		songNameTitle = songNameTitle.replace("Song Title: ", "");
		var newURL = "http://youtube.com/results?search_query=" + songNameTitle;
		chrome.tabs.create({ url: newURL});
	})
})

window.addEventListener('DOMContentLoaded', function() {
	var newLink = document.getElementById("searchsongonspotify");
	newLink.addEventListener('click', function() {
		var songNameTitle = document.getElementById("songtitle").innerHTML;
		songNameTitle = songNameTitle.replace("Song Title: ", "");
		var newURL = "https://open.spotify.com/search/results/" + songNameTitle;
		chrome.tabs.create({ url: newURL});
	})
})