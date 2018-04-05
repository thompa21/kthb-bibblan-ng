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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1nZXQuc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLWdldC5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUY7QUFDekYsOENBQTZEO0FBQzdELGdFQUFrRTtBQUVsRSxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLG1DQUFpQztBQUdqQztJQUlJLHdCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUh0QixrQkFBYSxHQUFHLHNDQUFzQyxDQUFDO1FBQ3ZELGNBQVMsR0FBRywrQ0FBK0MsQ0FBQztRQUk1RCxhQUFRLEdBQUcsaURBQWlELENBQUM7SUFGbkMsQ0FBQztJQUluQyxnQ0FBTyxHQUFQLFVBQVEsV0FBVztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6Qyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLEdBQW9CLElBQUksc0JBQWUsRUFBRSxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkUsMkNBQTJDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLE9BQU8sQ0FBQzthQUNyRCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUE7UUFDdkIscUNBQXFDO0lB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aW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zLCBVUkxTZWFyY2hQYXJhbXMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9jYXRjaFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEdldFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSB3ZWJzZXJ2aWNlVXJsID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS93ZWJzZXJ2aWNlcy9cIjtcclxuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS93ZWJzZXJ2aWNlcy9ncnVwcHJ1bS9cIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHJvb21zVXJsID0gJ2h0dHBzOi8vYXBwcy5saWIua3RoLnNlL3dlYnNlcnZpY2VzL2dydXBwcnVtL3YxJztcclxuXHJcbiAgICBnZXREYXRhKGJvb2tpbmdkYXRlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIdHRwR2V0U2VydmljZSAtIGdldERhdGFcIik7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuICAgICAgICAvL2xldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBsZXQgcGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLnNldChcImJvb2tpbmdkYXRlXCIsIGJvb2tpbmdkYXRlKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMsIHNlYXJjaDogcGFyYW1zIH0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zZXJ2ZXJVcmwgKyBcImJvb2tpbmdzXCIpO1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsICsgXCJib29raW5nc1wiLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAvLy5jYXRjaCh0aGlzLmhhbmRsZUVycm9yT2JzZXJ2YWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yT2JzZXJ2YWJsZSAoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoYW5kbGVFcnJvck9ic2VydmFibGVcIik7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuICAgICAgICByZXR1cm4gUnhPYnNlcnZhYmxlLnRocm93KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRCb29raW5nZGF0YShib29raW5naWQpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuc2V0KFwiYm9va2luZ2lkXCIsIGJvb2tpbmdpZCk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCArIFwiYm9va2luZ2RhdGFcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRSb29tQm9va2luZ3Mocm9vbWlkLCBib29raW5nZGF0ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSHR0cEdldFNlcnZpY2UgLSBnZXRSb29tQm9va2luZ3NcIik7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy5zZXQoXCJyb29taWRcIiwgcm9vbWlkKTtcclxuICAgICAgICBwYXJhbXMuc2V0KFwiYm9va2luZ2RhdGVcIiwgYm9va2luZ2RhdGUpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwgKyBcImJvb2tpbmdzXCIsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC8vLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JPYnNlcnZhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSb29tc2ZvcmFyZWEoYXJlYWlkOiBudW1iZXIpOiBSeE9ic2VydmFibGU8YW55W10+IHtcclxuICAgICAgICAvL2x1bWVuIEFQSVxyXG4gICAgICAgIC8vVE9ETyBow6RtdGEgand0dG9rZW5cclxuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9bXJicy9hcGkvdjEvcm9vbXMvP2FyZWFfaWQ9JHthcmVhaWR9JnRva2VuPSR7YXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJyl9YDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybDogXCIgKyB1cmwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybClcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRqd3R0b2tlbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuc2V0KFwidXNlcm5hbWVcIiwgdXNlcm5hbWUpO1xyXG4gICAgICAgIHBhcmFtcy5zZXQoXCJwYXNzd29yZFwiLCBwYXNzd29yZCk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9qd3R0b2tlbmFsbWEucGhwXCIsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tKV1QoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy53ZWJzZXJ2aWNlVXJsfW1yYnMvYXBpL3YxL2NoZWNrand0Lz90b2tlbj0ke2FwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuZ2V0U3RyaW5nKCdqd3R0b2tlbicpfWA7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cmw6IFwiICsgdXJsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0dXNlcigpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9bXJicy9hcGkvdjEvZ2V0dXNlcmZyb210b2tlbi8/dG9rZW49JHthcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nKX1gO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXJsOiBcIiArIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbWFVc2VyKHByaW1hcnlpZDogc3RyaW5nKXtcclxuICAgICAgICB2YXIgdXJsID0gYCR7dGhpcy53ZWJzZXJ2aWNlVXJsfWFsbWEvdjEvdXNlcnMvJHtwcmltYXJ5aWR9YDtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIC8vbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICAvL3BhcmFtcy5zZXQoXCJwcmltYXJ5aWRcIiwgcHJpbWFyeWlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldEFsbWFVc2VyX3VybDogXCIgKyB1cmwpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbWFVc2VyTG9hbnMocHJpbWFyeWlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9YWxtYS92MS91c2Vycy8ke3ByaW1hcnlpZH0vbG9hbnNgO1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XHJcbiAgICAgICAgbGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0QWxtYVVzZXJMb2Fuc191cmw6IFwiICsgdXJsKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMsIHNlYXJjaDogcGFyYW1zIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbG1hSXRlbShiYXJjb2RlOiBzdHJpbmcpe1xyXG4gICAgICAgIHZhciB1cmwgPSBgJHt0aGlzLndlYnNlcnZpY2VVcmx9YWxtYS92MS9pdGVtcy8ke2JhcmNvZGV9YDtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldEFsbWFVc2VyTG9hbnNfdXJsOiBcIiArIHVybCk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBzZXQgaGVhZGVycyBoZXJlIGUuZy5cclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhrZXlcIiwgXCJCZWFyZXIgXCIgKyBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nKSk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICB9XHJcbn0iXX0=