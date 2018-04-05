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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdHO0FBQ2hHLHNEQUErRDtBQUMvRCwwRUFBc0U7QUFFdEUsZ0VBQWtFO0FBRWxFLHdDQUFxRDtBQUNyRCxnQ0FBK0I7QUFJL0IsaURBQWdEO0FBUWhEO0lBVUksd0JBQ1ksTUFBd0IsRUFDeEIsVUFBMEIsRUFDMUIsTUFBYyxFQUNkLElBQVUsRUFDVixJQUFVO1FBSlYsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBZGYsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQWdCM0IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUE7SUFDTCxDQUFDO0lBRU0sMkNBQWtCLEdBQXpCLFVBQTBCLElBQUksRUFBRSxHQUFHO1FBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLG1CQUFtQixDQUFDLENBQUM7UUFDNUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRTNCLE1BQU0sQ0FBQyxrQkFB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V0FBVyxDQUFDO2tDQUFhLGlCQUFVO3NEQUFDO0lBQ3hCO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFjLGlCQUFVO3VEQUFDO0lBQ3JCO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFpQixpQkFBVTswREFBQztJQUo1QyxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBYyxDQUFDO1NBQzlCLENBQUM7eUNBWXNCLHlCQUFnQjtZQUNaLGtDQUFjO1lBQ2xCLGFBQU07WUFDUixXQUFJO1lBQ0osV0FBSTtPQWZiLGNBQWMsQ0FnSzFCO0lBQUQscUJBQUM7Q0FBQSxBQWhLRCxJQWdLQztBQWhLWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgSHR0cEdldFNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2h0dHAtZ2V0L2h0dHAtZ2V0LnNlcnZpY2VzXCI7XG5cbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInVpL2xhYmVsXCI7XG5cbmltcG9ydCB7IERhdGEgfSBmcm9tIFwiLi4vc2hhcmVkL3Byb3ZpZGVycy9kYXRhXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkxvZ2luXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbSHR0cEdldFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IHtcbiAgICBwdWJsaWMgd2ViVmlld1NyYzogc3RyaW5nID0gXCJcIjtcbiAgICBAVmlld0NoaWxkKFwibXlXZWJWaWV3XCIpIHdlYlZpZXdSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChcInVybEZpZWxkXCIpIHVybEZpZWxkUmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJsYWJlbFJlc3VsdFwiKSBsYWJlbFJlc3VsdFJlZjogRWxlbWVudFJlZjtcblxuICAgIC8vdXNlcjogVXNlcjtcbiAgICBsb2dnZWRpbjogYm9vbGVhbjtcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsIFxuICAgICAgICBwcml2YXRlIEdldFNlcnZpY2U6IEh0dHBHZXRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIGRhdGE6IERhdGEsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZVxuICAgICkge1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgXCJrdGhpZFwiOiBcInRob2xpbmRcIixcbiAgICAgICAgICAgIFwicGluXCI6IFwiODg4OFwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGFyYW1ldGVyQnlOYW1lKG5hbWUsIHVybCkge1xuICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKTtcbiAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIls/Jl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcbiAgICAgICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCFyZXN1bHRzWzJdKSByZXR1cm4gJyc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdvdG9hcHBsaWNhdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvdG9hcHBsaWNhdGlvbicpO1xuICAgICAgICAvL0lub20gbmdab25lIGbDtnIgYXR0IHZ5biBza2EgdXBwZGF0ZXJhc1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZVwiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ290b2xvZ2luKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ290b2xvZ2luJyk7XG4gICAgICAgIC8vSW5vbSBuZ1pvbmUgZsO2ciBhdHQgdnluIHNrYSB1cHBkYXRlcmFzXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJsb2dpblwiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiaG9tZVwiXSx7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KVxuICAgICAgICBsZXQgd2VidmlldzogV2ViVmlldyA9IHRoaXMud2ViVmlld1JlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgbGFiZWw6IExhYmVsID0gdGhpcy5sYWJlbFJlc3VsdFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAvL2xhYmVsLnRleHQgPSBcIkxvYWRpbmcuLi5cIjtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB3ZWJ2aWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsICBmdW5jdGlvbiAoYXJnczogTG9hZEV2ZW50RGF0YSkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICAgICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvL21lc3NhZ2UgPSBcIldlYlZpZXcgZmluaXNoZWQgbG9hZGluZyBvZiBcIiArIGFyZ3MudXJsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJFcnJvciBsb2FkaW5nIFwiICsgYXJncy51cmwgKyBcIjogXCIgKyBhcmdzLmVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFiZWwudGV4dCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAvL1RPRE8gaMOkbXRhIGV2ZXR1ZWxsIHRva2VuIGZyw6VuIHVybFxuICAgICAgICAgICAgdmFyIGp3dHRva2VuID0gdGhhdC5nZXRQYXJhbWV0ZXJCeU5hbWUoJ2p3dHRva2VuJyxhcmdzLnVybCk7XG4gICAgICAgICAgICBpZihqd3R0b2tlbiE9XCJcIiAmJiBqd3R0b2tlbiE9IG51bGwpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiand0dG9rZW4gZXJow6VsbGVuOiBcIiArIGp3dHRva2VuICk7XG4gICAgICAgICAgICAgICAgLy9TcGFyYSB0b2tlblxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3NNb2R1bGUuc2V0U3RyaW5nKCdqd3R0b2tlbicsIGp3dHRva2VuKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL1NraWNrYSB0aWxsIGFwcGxpa2F0aW9uXG4gICAgICAgICAgICAgICAgdGhhdC5sb2dnZWRpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhhdC5nb3RvYXBwbGljYXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYXJncy51cmwuaW5kZXhPZihcImh0dHBzOi8vbG9naW4ua3RoLnNlL2xvZ291dFwiKSE9PS0xKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVdGxvZ2dhZCFcIik7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5yZW1vdmUoJ2p3dHRva2VuJyk7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5yZW1vdmUoJ2FsbWFfcHJpbWFyeWlkJyk7XG4gICAgICAgICAgICAgICAgLy9Ta2lja2EgdGlsbCBsb2dpblxuICAgICAgICAgICAgICAgIHRoYXQubG9nZ2VkaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGF0LmdvdG9sb2dpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2dpbigpIHtcbiAgICAgICAgLy9sZXQgdGV4dEZpZWxkOiBUZXh0RmllbGQgPSB0aGlzLnVybEZpZWxkUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlZGluID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2ViVmlld1NyYyA9IFwiaHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2p3dHRva2Vua3RoY2FzX2FwcC5waHA/cmV0dXJsPWh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9jYWxsYmFjay5waHBcIjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhcHBzZXR0aW5nczogICcgKyBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nLCAndW5zZXQnKSk7XG4gICAgICAgIGlmIChhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLmdldFN0cmluZygnand0dG9rZW4nLCAndW5zZXQnKSAhPT0gJ3Vuc2V0Jyl7XG4gICAgICAgICAgICB0aGlzLkdldFNlcnZpY2UuY2hlY2tKV1QoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0LmF1dGhvcml6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ290b2FwcGxpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYlZpZXdTcmMgPSBcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9qd3R0b2tlbmt0aGNhc19hcHBfbG9nb3V0LnBocD9yZXR1cmw9aHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2NhbGxiYWNrLnBocFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLndlYlZpZXdTcmMgPSBcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9qd3R0b2tlbmt0aGNhc19hcHBfbG9nb3V0LnBocD9yZXR1cmw9aHR0cHM6Ly9hcHBzLmxpYi5rdGguc2Uvand0L2NhbGxiYWNrLnBocFwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL1NraWNrYSB0aWxsIEtUSCBsb2dvdXQgb20gc3RvcmFnZSDDpHIgc2F0dFxuICAgICAgICBpZiAodGhpcy5kYXRhLnN0b3JhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VkaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5zdG9yYWdlLmxvZ291dCk7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc3RvcmFnZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy53ZWJWaWV3U3JjID0gXCJodHRwczovL2FwcHMubGliLmt0aC5zZS9qd3Qvand0dG9rZW5rdGhjYXNfYXBwX2xvZ291dC5waHA/cmV0dXJsPWh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9jYWxsYmFjay5waHBcIlxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3RoaXMubG9nZ2VkaW4gPSB0cnVlO1xuICAgICAgICAgICAgLy90aGlzLndlYlZpZXdTcmMgPSBcImh0dHBzOi8vYXBwcy5saWIua3RoLnNlL2p3dC9qd3R0b2tlbmt0aGNhc19hcHAucGhwP3JldHVybD1odHRwczovL2FwcHMubGliLmt0aC5zZS9qd3QvY2FsbGJhY2sucGhwXCI7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbl9uZ2luaXRcIik7XG4gICAgICAgIGlmICh0eXBlb2YgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJykgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiand0dG9rZW46IFwiICsgYXBwbGljYXRpb25TZXR0aW5nc01vZHVsZS5nZXRTdHJpbmcoJ2p3dHRva2VuJykpO1xuICAgICAgICAgICAgdGhpcy5sb2dnZWRpbiA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvZ2dlZGluKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi90YWJzXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlZGluID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBsb2dnZWQgaW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nb3V0KCkge1xuICAgICAgICBhcHBsaWNhdGlvblNldHRpbmdzTW9kdWxlLnJlbW92ZSgnand0dG9rZW4nKTtcbiAgICAgICAgdGhpcy5sb2dnZWRpbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB1c2VyaW5mbygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3VzZXJpbmZvXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGFsbWFpbmZvKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWxtYWluZm9cIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgbXJicygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21yYnNcIl0seyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgdGVzdHBhZ2UxKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvdGVzdHBhZ2UxXCJdLHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGF1dGhjYWxsYmFjaygpIHtcbiAgICB9XG59Il19