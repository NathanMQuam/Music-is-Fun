import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import service from "../Services/SongsService.js";
import songService from "../Services/SongsService.js";

//Search results to page (search entered in search bar(form))
function _drawResults() {
  let songSearch = ProxyState.songs
  let template = ""
  songSearch.forEach(s => template += s.Template)
  document.getElementById("songs").innerHTML = template
}

//Saved songs to page
function _drawPlaylist() {
  let mySongs = ProxyState.playlist
  let template = ""
  mySongs.forEach(s => template += s.playlistTemplate)
  document.getElementById("playlist").innerHTML = template
}

// Draws current song to "Now-Playing"
/**
 * @param {Song} song
 */
function _drawCurrentSong(song) {
  document.getElementById('now-playing').innerHTML = /*html*/ `
    <img src='${song.albumArt}' width="200px" height="200px"><br/>
    <small>${song.album}</small>
    <div>${song.title}</div>
    <small>${song.artist}</small>
    <div>${song.price}</div>
    <button onclick="console.error('Eyy, theres no music yet!')">Add to My Music</button>
    <div class="bg-light text-dark">Music player</div>
  `
}





//Public
export default class SongsController {
  constructor() {
    songService.getMySongs()
    ProxyState.on("playlist", _drawPlaylist)
    ProxyState.on("songs", _drawResults)
    _drawPlaylist()
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You don't need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    songService.addSong(id)
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    songService.removeSong(id)
  }

  playSong(id) {
    _drawCurrentSong(ProxyState.songs.find(s => s._id == id))
  }
}
