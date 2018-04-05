"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var applicationSettingsModule = require("application-settings");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var HttpGetService = /** @class */ (function () {
    function HttpGetService(http) {
        this.http = http;
        this.webserviceUrl = "https://apps.lib.kth.se/webservices/";
        this.serverUrl = "https://apps.lib.kth.se/webservices/grupprum/";
        this.roomsUrl = 'https://apps.lib.kth.se/webservices/grupprum/v1';
    }
    HttpGetService.prototype.getData = function (bookingdate) {
        console.log("HttpGetService - getData");
        var headers = this.createRequestHeader();
        //let headers = new Headers();
        var params = new http_1.URLSearchParams();
        params.set("bookingdate", bookingdate);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        //console.log(this.serverUrl + "bookings");
        console.dir(options);
        return this.http.get(this.serverUrl + "bookings", options)
            .map(function (res) { return res.json(); });
        //.catch(this.handleErrorObservable);
    };
    HttpGetService.prototype.handleErrorObservable = function (error) {
        console.log("handleErrorObservable");
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.message || error);
    };
    HttpGetService.prototype.getBookingdata = function (bookingid) {
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        params.set("bookingid", bookingid);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(this.serverUrl + "bookingdata", options)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.getRoomBookings = function (roomid, bookingdate) {
        console.log("HttpGetService - getRoomBookings");
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        params.set("roomid", roomid);
        params.set("bookingdate", bookingdate);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(this.serverUrl + "bookings", options)
            .map(function (res) { return res.json(); });
        //.catch(this.handleErrorObservable);
    };
    HttpGetService.prototype.getRoomsforarea = function (areaid) {
        //lumen API
        //TODO hämta jwttoken
        var url = this.webserviceUrl + "mrbs/api/v1/rooms/?area_id=" + areaid + "&token=" + applicationSettingsModule.getString('jwttoken');
        console.log("url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.getjwttoken = function (username, password) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var params = new http_1.URLSearchParams();
        params.set("username", username);
        params.set("password", password);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get("https://apps.lib.kth.se/jwt/jwttokenalma.php", options)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.checkJWT = function () {
        var url = this.webserviceUrl + "mrbs/api/v1/checkjwt/?token=" + applicationSettingsModule.getString('jwttoken');
        console.log("url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.getuser = function () {
        var url = this.webserviceUrl + "mrbs/api/v1/getuserfromtoken/?token=" + applicationSettingsModule.getString('jwttoken');
        console.log("url: " + url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.getAlmaUser = function (primaryid) {
        var url = this.webserviceUrl + "alma/v1/users/" + primaryid;
        var headers = this.createRequestHeader();
        //let headers = new Headers();
        var params = new http_1.URLSearchParams();
        //params.set("primaryid", primaryid);
        console.log("getAlmaUser_url: " + url);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.getAlmaUserLoans = function (primaryid) {
        var url = this.webserviceUrl + "alma/v1/users/" + primaryid + "/loans";
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        console.log("getAlmaUserLoans_url: " + url);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.getAlmaItem = function (barcode) {
        var url = this.webserviceUrl + "alma/v1/items/" + barcode;
        var headers = this.createRequestHeader();
        var params = new http_1.URLSearchParams();
        console.log("getAlmaUserLoans_url: " + url);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url, options)
            .map(function (res) { return res.json(); });
    };
    HttpGetService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        // set headers here e.g.
        headers.append("Authkey", "Bearer " + applicationSettingsModule.getString('jwttoken'));
        headers.append("Content-Type", "application/json");
        return headers;
    };
    HttpGetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], HttpGetService);
    return HttpGetService;
}());
exports.HttpGetService = HttpGetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1nZXQuc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLWdldC5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUY7QUFDekYsOENBQTZEO0FBQzdELGdFQUFrRTtBQUVsRSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLG1DQUFpQztBQUdqQztJQUlJLHdCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUh0QixrQkFBYSxHQUFHLHNDQUFzQyxDQUFDO1FBQ3ZELGNBQVMsR0FBRywrQ0FBK0MsQ0FBQztRQUk1RCxhQUFRLEdBQUcsaURBQWlELENBQUM7SUFGbkMsQ0FBQztJQUluQyxnQ0FBTyxHQUFQLFVBQVEsV0FBVztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6Qyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLEdBQW9CLElBQUksc0JBQWUsRUFBRSxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkUsMkNBQTJDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLE9BQU8sQ0FBQzthQUNyRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUE7UUFDdkIscUNBQXFDO0lB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cG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucywgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBHZXRTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHdlYnNlcnZpY2VVcmwgPSBcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL3dlYnNlcnZpY2VzL1wiO1xuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS93ZWJzZXJ2aWNlcy9ncnVwcHJ1bS9cIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG4gICAgXG4gICAgcHJpdmF0ZSByb29tc1VybCA9ICdodHRwczovL2FwcHMubGliLmt0aC5zZS93ZWJzZXJ2aWNlcy9ncnVwcHJ1bS92MSc7XG5cbiAgICBnZXREYXRhKGJvb2tpbmdkYXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSHR0cEdldFNlcnZpY2UgLSBnZXREYXRhXCIpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvL2xldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBwYXJhbXMuc2V0KFwiYm9va2luZ2RhdGVcIiwgYm9va2luZ2RhdGUpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMsIHNlYXJjaDogcGFyYW1zIH0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2VydmVyVXJsICsgXCJib29raW5nc1wiKTtcbiAgICAgICAgY29uc29sZS5kaXIob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsICsgXCJib29raW5nc1wiLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC8vLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JPYnNlcnZhYmxlKTtcbiAgICAgICAgfVxuICAgIFxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3JPYnNlcnZhYmxlIChlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVFcnJvck9ic2VydmFibGVcIik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgIHJldHVybiBSeE9ic2VydmFibGUudGhyb3coZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgfVxuICAgIFxuICAgIGdldEJvb2tpbmdkYXRhKGJvb2tpbmdpZCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICBsZXQgcGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJib29raW5naWRcIiwgYm9va2luZ2lkKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwgKyBcImJvb2tpbmdkYXRhXCIsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGdldFJvb21Cb29raW5ncyhyb29taWQsIGJvb2tpbmdkYXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSHR0cEdldFNlcnZpY2UgLSBnZXRSb29tQm9va2luZ3NcIik7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG5cbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBwYXJhbXMuc2V0KFwicm9vbWlkXCIsIHJvb21pZCk7XG4gICAgICAgIHBhcmFtcy5zZXQoXCJib29raW5nZGF0ZVwiLCBib29raW5nZGF0ZSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsICsgXCJib29raW5nc1wiLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC8vLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JPYnNlcnZhYmxlKTtcbiAgICB9XG5cbiAgICBnZXRSb29tc2ZvcmFyZWEoYXJlYWlkOiBudW1iZXIpOiBSeE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgLy9sdW1lbiBBUElcbiAgICAgICAgLy9UT0RPIGjDpG10YSBqd3R0b2tlblxuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9bXJicy9hcGkvdjEvcm9vbXMvP2FyZWFfaWQ9JHthcmVhaWR9JnRva2VuPSR7YXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJyl9YDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmw6IFwiICsgdXJsKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBnZXRqd3R0b2tlbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zLnNldChcInVzZXJuYW1lXCIsIHVzZXJuYW1lKTtcbiAgICAgICAgcGFyYW1zLnNldChcInBhc3N3b3JkXCIsIHBhc3N3b3JkKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoXCJodHRwczovL2FwcHMubGliLmt0aC5zZS9qd3Qvand0dG9rZW5hbG1hLnBocFwiLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBjaGVja0pXVCgpIHtcbiAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy53ZWJzZXJ2aWNlVXJsfW1yYnMvYXBpL3YxL2NoZWNrand0Lz90b2tlbj0ke2FwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuZ2V0U3RyaW5nKCdqd3R0b2tlbicpfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidXJsOiBcIiArIHVybCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybClcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgZ2V0dXNlcigpIHtcbiAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy53ZWJzZXJ2aWNlVXJsfW1yYnMvYXBpL3YxL2dldHVzZXJmcm9tdG9rZW4vP3Rva2VuPSR7YXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJyl9YDtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmw6IFwiICsgdXJsKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBnZXRBbG1hVXNlcihwcmltYXJ5aWQ6IHN0cmluZyl7XG4gICAgICAgIHZhciB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9YWxtYS92MS91c2Vycy8ke3ByaW1hcnlpZH1gO1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICAvL2xldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICAvL3BhcmFtcy5zZXQoXCJwcmltYXJ5aWRcIiwgcHJpbWFyeWlkKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXRBbG1hVXNlcl91cmw6IFwiICsgdXJsKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9XG5cbiAgICBnZXRBbG1hVXNlckxvYW5zKHByaW1hcnlpZDogc3RyaW5nKXtcbiAgICAgICAgdmFyIHVybCA9IGAke3RoaXMud2Vic2VydmljZVVybH1hbG1hL3YxL3VzZXJzLyR7cHJpbWFyeWlkfS9sb2Fuc2A7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXRBbG1hVXNlckxvYW5zX3VybDogXCIgKyB1cmwpO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMsIHNlYXJjaDogcGFyYW1zIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGdldEFsbWFJdGVtKGJhcmNvZGU6IHN0cmluZyl7XG4gICAgICAgIHZhciB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9YWxtYS92MS9pdGVtcy8ke2JhcmNvZGV9YDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImdldEFsbWFVc2VyTG9hbnNfdXJsOiBcIiArIHVybCk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhrZXlcIiwgXCJCZWFyZXIgXCIgKyBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nKSk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICBcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxufSJdfQ==