import { Note } from "./../models/Note";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NoteService {
  private createNoteUrl: string = `${environment.NOTE_API_URL +
    environment.CREATE_NOTE_URL}`;
  constructor(private _httpService: HttpService) {}

  // fetching token from local storage stored during login
  private httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json",
      token: localStorage.getItem("token")
    })
  };

  public createNote(note: Note) {
    console.log(
      "fetching token from header : ",
      this.httpOptions,
      "note : ",
      note
    );
    return this._httpService.postMethod(
      this.createNoteUrl,
      note,
      this.httpOptions
    );
  }
}
