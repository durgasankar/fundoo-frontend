import { Note } from "./../models/Note";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class NoteService {
  private createNoteUrl: string = `${environment.NOTE_API_URL +
    environment.CREATE_NOTE_URL}`;
  constructor(private _httpService: HttpService) {}

  public createNote(note: Note) {
    console.log("note dto ", note);
    console.log("fetching token from header : ", this._httpService.httpOtions);

    return this._httpService.postMethod(
      this.createNoteUrl,
      note,
      this._httpService.httpOtions
    );
  }
}
