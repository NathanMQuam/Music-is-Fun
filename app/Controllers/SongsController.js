import { ProxyState } from "../AppState.js";
import service from "../Services/SongsService.js";
import songService from "../Services/SongsService.js";

//Search results to page (search entered in search bar(form))
function _drawResults() {
  
}

//Saved songs to page
function _drawPlaylist() {
  let mySongs = ProxyState.playlist
  let template = ""
  mySongs.forEach(s=> template += `<li> ${s.title} </li>`)

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
}
