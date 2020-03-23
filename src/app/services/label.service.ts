import { NoteService } from "src/app/services/note.service";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Subject } from "rxjs";
import { Label } from "../models/label";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LabelService {
  private _subject = new Subject<any>();

  constructor(private _httpservice: HttpService) {}

  private fetchAllLabelsUrl: string = `${environment.LABEL_API_URL +
    environment.GET_ALL_LABELS_URL}`;

  private createLabelUrl: string = `${environment.LABEL_API_URL +
    environment.CREATE_LABEL_URL}`;

  public get autoRefesh() {
    return this._subject;
  }

  public getAllLabelsList() {
    console.log("all list fetching from service : ");
    return this._httpservice.getMethod(
      this.fetchAllLabelsUrl,
      this._httpservice.httpOptions
    );
  }
  public createLabel(newLabel: any) {
    console.log("create label service reached");
    return this._httpservice
      .postMethod(this.createLabelUrl, newLabel, this._httpservice.httpOptions)
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
}
