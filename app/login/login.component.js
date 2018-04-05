"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var http_get_services_1 = require("../shared/http-get/http-get.services");
var applicationSettingsModule = require("application-settings");
var web_view_1 = require("ui/web-view");
var page_1 = require("ui/page");
var data_1 = require("../shared/providers/data");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, GetService, ngZone, data, page) {
        this.router = router;
        this.GetService = GetService;
        this.ngZone = ngZone;
        this.data = data;
        this.page = page;
        this.webViewSrc = "";
        this.input = {
            "kthid": "tholind",
            "pin": "8888"
        };
    }
    LoginComponent.prototype.getParameterByName = function (name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    LoginComponent.prototype.gotoapplication = function () {
        var _this = this;
        console.log('gotoapplication');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(function () {
            _this.router.navigate(["home"], { clearHistory: true });
        });
    };
    LoginComponent.prototype.gotologin = function () {
        var _this = this;
        console.log('gotologin');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(function () {
            _this.router.navigate(["login"], { clearHistory: true });
        });
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        //this.router.navigate(["home"],{ clearHistory: true })
        var webview = this.webViewRef.nativeElement;
        var label = this.labelResultRef.nativeElement;
        //label.text = "Loading...";
        var that = this;
        webview.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            var message;
            if (!args.error) {
                //message = "WebView finished loading of " + args.url;
            }
            else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            label.text = message;
            //TODO hämta evetuell token från url
            var jwttoken = that.getParameterByName('jwttoken', args.url);
            if (jwttoken != "" && jwttoken != null) {
                console.log("jwttoken erhållen: " + jwttoken);
                //Spara token
                applicationSettingsModule.setString('jwttoken', jwttoken);
                //Skicka till applikation
                that.loggedin = true;
                that.gotoapplication();
            }
            if (args.url.indexOf("https://login.kth.se/logout") !== -1) {
                console.log("Utloggad!");
                applicationSettingsModule.remove('jwttoken');
                applicationSettingsModule.remove('alma_primaryid');
                //Skicka till login
                that.loggedin = false;
                that.gotologin();
            }
        });
    };
    LoginComponent.prototype.login = function () {
        //let textField: TextField = this.urlFieldRef.nativeElement;
        this.loggedin = true;
        this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app.php?returl=https://apps.lib.kth.se/jwt/callback.php";
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        console.log('appsettings:  ' + applicationSettingsModule.getString('jwttoken', 'unset'));
        if (applicationSettingsModule.getString('jwttoken', 'unset') !== 'unset') {
            this.GetService.checkJWT()
                .subscribe(function (result) {
                if (result.authorized) {
                    _this.loggedin = true;
                    _this.gotoapplication();
                }
                else {
                    _this.loggedin = false;
                    _this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app_logout.php?returl=https://apps.lib.kth.se/jwt/callback.php";
                }
            }, function (error) {
                console.log(error);
                _this.loggedin = false;
                _this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app_logout.php?returl=https://apps.lib.kth.se/jwt/callback.php";
            });
        }
        //Skicka till KTH logout om storage är satt
        if (this.data.storage) {
            this.loggedin = false;
            console.log(this.data.storage.logout);
            this.data.storage.length = 0;
            this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app_logout.php?returl=https://apps.lib.kth.se/jwt/callback.php";
        }
        else {
            //this.loggedin = true;
            //this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app.php?returl=https://apps.lib.kth.se/jwt/callback.php";
        }
        /*
        console.log("login_nginit");
        if (typeof applicationSettingsModule.getString('jwttoken') !== "undefined") {
            console.log("jwttoken: " + applicationSettingsModule.getString('jwttoken'));
            this.loggedin = true;
            console.log(this.loggedin);
            this.router.navigate(["/tabs"],{ clearHistory: true })
        } else {
            this.loggedin = false;
            console.log("not logged in");
        }
        */
    };
    LoginComponent.prototype.logout = function () {
        applicationSettingsModule.remove('jwttoken');
        this.loggedin = false;
    };
    LoginComponent.prototype.userinfo = function () {
        this.router.navigate(["/userinfo"], { clearHistory: true });
    };
    LoginComponent.prototype.almainfo = function () {
        this.router.navigate(["/almainfo"], { clearHistory: true });
    };
    LoginComponent.prototype.mrbs = function () {
        this.router.navigate(["/mrbs"], { clearHistory: true });
    };
    LoginComponent.prototype.testpage1 = function () {
        this.router.navigate(["/testpage1"], { clearHistory: true });
    };
    LoginComponent.prototype.authcallback = function () {
    };
    __decorate([
        core_1.ViewChild("myWebView"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "webViewRef", void 0);
    __decorate([
        core_1.ViewChild("urlField"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "urlFieldRef", void 0);
    __decorate([
        core_1.ViewChild("labelResult"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "labelResultRef", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "Login",
            moduleId: module.id,
            templateUrl: "./login.component.html",
            providers: [http_get_services_1.HttpGetService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            http_get_services_1.HttpGetService,
            core_1.NgZone,
            data_1.Data,
            page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdHO0FBQ2hHLHNEQUErRDtBQUMvRCwwRUFBc0U7QUFFdEUsZ0VBQWtFO0FBRWxFLHdDQUFxRDtBQUNyRCxnQ0FBK0I7QUFJL0IsaURBQWdEO0FBUWhEO0lBVUksd0JBQ1ksTUFBd0IsRUFDeEIsVUFBMEIsRUFDMUIsTUFBYyxFQUNkLElBQVUsRUFDVixJQUFVO1FBSlYsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBZGYsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQWdCM0IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUE7SUFDTCxDQUFDO0lBRU0sMkNBQWtCLEdBQXpCLFVBQTBCLElBQUksRUFBRSxHQUFHO1FBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLG1CQUFtQixDQUFDLENBQUM7UUFDNUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxrQkFB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V0FBVyxDQUFDO2tDQUFhLGlCQUFVO3NEQUFDO0lBQ3hCO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFjLGlCQUFVO3VEQUFDO0lBQ3JCO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFpQixpQkFBVTswREFBQztJQUo1QyxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBYyxDQUFDO1NBQzlCLENBQUM7eUNBWXNCLHlCQUFnQjtZQUNaLGtDQUFjO1lBQ2xCLGFBQU07WUFDUixXQUFJO1lBQ0osV0FBSTtPQWZiLGNBQWMsQ0FnSzFCO0lBQUQscUJBQUM7Q0FBQSxBQWhLRCxJQWdLQztBQWhLWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEh0dHBHZXRTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9odHRwLWdldC9odHRwLWdldC5zZXJ2aWNlc1wiO1xyXG5cclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uL3NoYXJlZC9wcm92aWRlcnMvZGF0YVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHByb3ZpZGVyczogW0h0dHBHZXRTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xyXG4gICAgcHVibGljIHdlYlZpZXdTcmM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBAVmlld0NoaWxkKFwibXlXZWJWaWV3XCIpIHdlYlZpZXdSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwidXJsRmllbGRcIikgdXJsRmllbGRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwibGFiZWxSZXN1bHRcIikgbGFiZWxSZXN1bHRSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgLy91c2VyOiBVc2VyO1xyXG4gICAgbG9nZ2VkaW46IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIFxyXG4gICAgICAgIHByaXZhdGUgR2V0U2VydmljZTogSHR0cEdldFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICBwcml2YXRlIGRhdGE6IERhdGEsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICAgICAgICBcImt0aGlkXCI6IFwidGhvbGluZFwiLFxyXG4gICAgICAgICAgICBcInBpblwiOiBcIjg4ODhcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFyYW1ldGVyQnlOYW1lKG5hbWUsIHVybCkge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpO1xyXG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbPyZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKTtcclxuICAgICAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuICAgICAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ290b2FwcGxpY2F0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnb3RvYXBwbGljYXRpb24nKTtcclxuICAgICAgICAvL0lub20gbmdab25lIGbDtnIgYXR0IHZ5biBza2EgdXBwZGF0ZXJhc1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImhvbWVcIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ290b2xvZ2luKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnb3RvbG9naW4nKTtcclxuICAgICAgICAvL0lub20gbmdab25lIGbDtnIgYXR0IHZ5biBza2EgdXBwZGF0ZXJhc1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxvZ2luXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZVwiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxyXG4gICAgICAgIGxldCB3ZWJ2aWV3OiBXZWJWaWV3ID0gdGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGxhYmVsOiBMYWJlbCA9IHRoaXMubGFiZWxSZXN1bHRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAvL2xhYmVsLnRleHQgPSBcIkxvYWRpbmcuLi5cIjtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd2Vidmlldy5vbihXZWJWaWV3LmxvYWRGaW5pc2hlZEV2ZW50LCAgZnVuY3Rpb24gKGFyZ3M6IExvYWRFdmVudERhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGlmICghYXJncy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgLy9tZXNzYWdlID0gXCJXZWJWaWV3IGZpbmlzaGVkIGxvYWRpbmcgb2YgXCIgKyBhcmdzLnVybDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkVycm9yIGxvYWRpbmcgXCIgKyBhcmdzLnVybCArIFwiOiBcIiArIGFyZ3MuZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFiZWwudGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIC8vVE9ETyBow6RtdGEgZXZldHVlbGwgdG9rZW4gZnLDpW4gdXJsXHJcbiAgICAgICAgICAgIHZhciBqd3R0b2tlbiA9IHRoYXQuZ2V0UGFyYW1ldGVyQnlOYW1lKCdqd3R0b2tlbicsYXJncy51cmwpO1xyXG4gICAgICAgICAgICBpZihqd3R0b2tlbiE9XCJcIiAmJiBqd3R0b2tlbiE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqd3R0b2tlbiBlcmjDpWxsZW46IFwiICsgand0dG9rZW4gKTtcclxuICAgICAgICAgICAgICAgIC8vU3BhcmEgdG9rZW5cclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKCdqd3R0b2tlbicsIGp3dHRva2VuKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9Ta2lja2EgdGlsbCBhcHBsaWthdGlvblxyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2dnZWRpbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdvdG9hcHBsaWNhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihhcmdzLnVybC5pbmRleE9mKFwiaHR0cHM6Ly9sb2dpbi5rdGguc2UvbG9nb3V0XCIpIT09LTEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXRsb2dnYWQhXCIpO1xyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5yZW1vdmUoJ2p3dHRva2VuJyk7XHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLnJlbW92ZSgnYWxtYV9wcmltYXJ5aWQnKTtcclxuICAgICAgICAgICAgICAgIC8vU2tpY2thIHRpbGwgbG9naW5cclxuICAgICAgICAgICAgICAgIHRoYXQubG9nZ2VkaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ290b2xvZ2luKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICAvL2xldCB0ZXh0RmllbGQ6IFRleHRGaWVsZCA9IHRoaXMudXJsRmllbGRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2ViVmlld1NyYyA9IFwiaHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2p3dHRva2Vua3RoY2FzX2FwcC5waHA/cmV0dXJsPWh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9jYWxsYmFjay5waHBcIjtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZygnYXBwc2V0dGluZ3M6ICAnICsgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJywgJ3Vuc2V0JykpO1xyXG4gICAgICAgIGlmIChhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nLCAndW5zZXQnKSAhPT0gJ3Vuc2V0Jyl7XHJcbiAgICAgICAgICAgIHRoaXMuR2V0U2VydmljZS5jaGVja0pXVCgpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQuYXV0aG9yaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ290b2FwcGxpY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYlZpZXdTcmMgPSBcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9qd3R0b2tlbmt0aGNhc19hcHBfbG9nb3V0LnBocD9yZXR1cmw9aHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2NhbGxiYWNrLnBocFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJWaWV3U3JjID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS9qd3Qvand0dG9rZW5rdGhjYXNfYXBwX2xvZ291dC5waHA/cmV0dXJsPWh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9jYWxsYmFjay5waHBcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9Ta2lja2EgdGlsbCBLVEggbG9nb3V0IG9tIHN0b3JhZ2Ugw6RyIHNhdHRcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuc3RvcmFnZS5sb2dvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLndlYlZpZXdTcmMgPSBcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9qd3R0b2tlbmt0aGNhc19hcHBfbG9nb3V0LnBocD9yZXR1cmw9aHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2NhbGxiYWNrLnBocFwiXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2dnZWRpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vdGhpcy53ZWJWaWV3U3JjID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS9qd3Qvand0dG9rZW5rdGhjYXNfYXBwLnBocD9yZXR1cmw9aHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2NhbGxiYWNrLnBocFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9naW5fbmdpbml0XCIpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJykgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJqd3R0b2tlbjogXCIgKyBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nKSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvZ2dlZGluKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3RhYnNcIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlZGluID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGxvZ2dlZCBpblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUucmVtb3ZlKCdqd3R0b2tlbicpO1xyXG4gICAgICAgIHRoaXMubG9nZ2VkaW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXNlcmluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3VzZXJpbmZvXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFsbWFpbmZvKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9hbG1haW5mb1wiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtcmJzKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tcmJzXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRlc3RwYWdlMSgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGVzdHBhZ2UxXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF1dGhjYWxsYmFjaygpIHtcclxuICAgIH1cclxufSJdfQ==