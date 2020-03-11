import { Note } from "./../models/Note";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NoteService {
  private createNoteUrl: string = `${environment.NOTE_API_URL +
    environment.CREATE_NOTE_URL}`;

  private getAllNotesUrl: string = `${environment.NOTE_API_URL +
    environment.GET_ALL_NOTES_URL}`;
  constructor(private _httpService: HttpService) {}

  private _notesList = new Subject<any>();
  private _subject = new Subject<any>();
  private _content = new BehaviorSubject<number>(0);
  public share = this._content.asObservable();

  public get autoRefesh() {
    return this._subject;
  }

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
    return this._httpService
      .postMethod(this.createNoteUrl, note, this.httpOptions)
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
  public getAllNotes() {
    return this._httpService.getMethod(this.getAllNotesUrl, this.httpOptions);
  }
}
