import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  public httpOtions = {
    headers: new HttpHeaders({ "content-type": "application/json" })
  };
  constructor(private _httpClient: HttpClient) {}

  public postMethod(url: string, body: any, options: any): Observable<any> {
    return this._httpClient.post(url, body, options);
  }

  public getMethod(url: string, options: any): Observable<any> {
    return this._httpClient.get(url, options);
  }

  public putMethod(url: any, body: any, options: any): Observable<any> {
    return this._httpClient.put(url, body, options);
  }
}
