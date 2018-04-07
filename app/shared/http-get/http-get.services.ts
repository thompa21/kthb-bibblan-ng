import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import * as applicationSettingsModule from "application-settings";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()
export class HttpGetService {
    private webserviceUrl = "https://apps.lib.kth.se/webservices/";
    private serverUrl = "https://apps.lib.kth.se/webservices/grupprum/";

    constructor(private http: Http) {
        
     }
    
    private handleErrorObservable (error: Response | any) {
        console.log("handleErrorObservable");
        console.error(error.message || error);
        return RxObservable.throw(error.message || error);
    }

    getRoomBookings(bookingdate) {
        console.log("HttpGetServices - getRoomBookings");
        let areaid = "2";
        /*
        let headers = this.createRequestHeader();
        let params: URLSearchParams = new URLSearchParams();
        params.set("roomid", roomid);
        params.set("bookingdate", bookingdate);
        let options = new RequestOptions({ headers: headers, search: params });
        */
        //lumen API
        //TODO hämta jwttoken
        const url = `${this.webserviceUrl}mrbs/api/v1/getbookings/?bookingdate=${bookingdate}&area_id=${areaid}&token=${applicationSettingsModule.getString('jwttoken')}`;
        //return this.http.get(this.serverUrl + "bookings", options)
        return this.http.get(url)
            .map(res => res.json())
            //.catch(this.handleErrorObservable);
    }

    getRoomsforarea(areaid: number): RxObservable<any[]> {
        //lumen API
        //TODO hämta jwttoken
        const url = `${this.webserviceUrl}mrbs/api/v1/rooms/?area_id=${areaid}&token=${applicationSettingsModule.getString('jwttoken')}`;
        console.log("url: " + url);
        return this.http.get(url)
            .map(res => res.json())
    }

    getjwttoken(username, password) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let params: URLSearchParams = new URLSearchParams();
        params.set("username", username);
        params.set("password", password);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get("https://apps.lib.kth.se/jwt/jwttokenalma.php", options)
            .map(res => res.json())
    }

    checkJWT() {
        const url = `${this.webserviceUrl}mrbs/api/v1/checkjwt/?token=${applicationSettingsModule.getString('jwttoken')}`;
        console.log("url: " + url);
        return this.http.get(url)
            .map(res => res.json())
    }

    getuser() {
        const url = `${this.webserviceUrl}mrbs/api/v1/getuserfromtoken/?token=${applicationSettingsModule.getString('jwttoken')}`;
        console.log("url: " + url);
        return this.http.get(url)
            .map(res => res.json())
    }

    getAlmaUser(primaryid: string){
        var url = `${this.webserviceUrl}alma/v1/users/${primaryid}`;
        let headers = this.createRequestHeader();
        //let headers = new Headers();
        let params: URLSearchParams = new URLSearchParams();
        //params.set("primaryid", primaryid);
        console.log("getAlmaUser_url: " + url);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(res => res.json())
    }

    getAlmaUserLoans(primaryid: string){
        var url = `${this.webserviceUrl}alma/v1/users/${primaryid}/loans`;
        let headers = this.createRequestHeader();
        let params: URLSearchParams = new URLSearchParams();
        console.log("getAlmaUserLoans_url: " + url);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(res => res.json())
    }

    getAlmaItem(barcode: string){
        var url = `${this.webserviceUrl}alma/v1/items/${barcode}`;
        let headers = this.createRequestHeader();
        let params: URLSearchParams = new URLSearchParams();
        console.log("getAlmaUserLoans_url: " + url);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(res => res.json())
    }

    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
        headers.append("Authkey", "Bearer " + applicationSettingsModule.getString('jwttoken'));
        headers.append("Content-Type", "application/json");
       
        return headers;
    }
}