export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return /*html*/ `
      <div class="w-100 bg-gray text-light p-3 d-flex">
        <img width="50px" height="50px" src="${this.albumArt}">
        <div>
            <div class="ml-1">${this.title}</div>
            <small class="ml-2">${this.artist}</small>
        </div>
        <button onclick="app.songsController.playSong('${this._id}')" class="ml-auto btn btn-info">Play</button>
      </div>
    `;
  }

  get playlistTemplate() {
    return /*html*/ `
      <div class="h-100 bg-dark text-light p-3 d-flex">
        <div onclick="app.songsController.playSong('${this._id}'">
          <img src="${this.albumArt}" width="50px" height="50px">
          <div>
              <div class="ml-1">${this.title}</div>
              <small class="ml-2">${this.artist}</small>
          </div>
        </div>
        <div class="ml-auto" onclick="app.songsController.removeSong('${this._id}')">
            <i>&times;</i>
        </div>
      </div>
    `;
  }
}
