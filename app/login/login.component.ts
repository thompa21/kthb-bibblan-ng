import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HttpGetService } from "../shared/http-get/http-get.services";

import * as applicationSettingsModule from "application-settings";

import { WebView, LoadEventData } from "ui/web-view";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Label } from "ui/label";

import { Data } from "../shared/providers/data";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    providers: [HttpGetService]
})
export class LoginComponent {
    public webViewSrc: string = "";
    @ViewChild("myWebView") webViewRef: ElementRef;
    @ViewChild("urlField") urlFieldRef: ElementRef;
    @ViewChild("labelResult") labelResultRef: ElementRef;

    //user: User;
    loggedin: boolean;
    public input: any;
    
    constructor(
        private router: RouterExtensions, 
        private GetService: HttpGetService,
        private ngZone: NgZone,
        private data: Data,
        private page: Page
    ) {
        this.input = {
            "kthid": "tholind",
            "pin": "8888"
        }
    }

    public getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    public gotoapplication() {
        console.log('gotoapplication');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(() => {
            this.router.navigate(["home"],{ clearHistory: true })
        });
    }

    public gotologin() {
        console.log('gotologin');
        //Inom ngZone för att vyn ska uppdateras
        this.ngZone.run(() => {
            this.router.navigate(["login"],{ clearHistory: true })
        });
    }

    ngAfterViewInit() {
        //this.router.navigate(["home"],{ clearHistory: true })
        let webview: WebView = this.webViewRef.nativeElement;
        let label: Label = this.labelResultRef.nativeElement;
        //label.text = "Loading...";
        var that = this;
        webview.on(WebView.loadFinishedEvent,  function (args: LoadEventData) {
            let message;
            if (!args.error) {
                //message = "WebView finished loading of " + args.url;
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            label.text = message;
            //TODO hämta evetuell token från url
            var jwttoken = that.getParameterByName('jwttoken',args.url);
            if(jwttoken!="" && jwttoken!= null){
                console.log("jwttoken erhållen: " + jwttoken );
                //Spara token
                applicationSettingsModule.setString('jwttoken', jwttoken);
                
                //Skicka till applikation
                that.loggedin = true;
                that.gotoapplication();
            }
            try {
                if(args.url.indexOf("https://login.kth.se/logout")!==-1) {
                    console.log("Utloggad!");
                    applicationSettingsModule.remove('jwttoken');
                    applicationSettingsModule.remove('alma_primaryid');
                    //Skicka till login
                    that.loggedin = false;
                    that.gotologin();
                }
                
            } catch (error) {
                
            }
            
        });
    }

    login() {
        //let textField: TextField = this.urlFieldRef.nativeElement;
            this.loggedin = true;
            this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app.php?returl=https://apps.lib.kth.se/jwt/callback.php";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        console.log('appsettings:  ' + applicationSettingsModule.getString('jwttoken', 'unset'));
        if (applicationSettingsModule.getString('jwttoken', 'unset') !== 'unset'){
            this.GetService.checkJWT()
            .subscribe(
                (result) => {
                if(result.authorized) {
                    this.loggedin = true;
                    this.gotoapplication();
                } else {
                    this.loggedin = false;
                    this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app_logout.php?returl=https://apps.lib.kth.se/jwt/callback.php"
                }
            }, (error) => {
                console.log(error);
                this.loggedin = false;
                this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app_logout.php?returl=https://apps.lib.kth.se/jwt/callback.php"
            });
        }
        //Skicka till KTH logout om storage är satt
        if (this.data.storage) {
            this.loggedin = false;
            console.log(this.data.storage.logout);
            this.data.storage.length = 0;
            this.webViewSrc = "https://apps.lib.kth.se/jwt/jwttokenkthcas_app_logout.php?returl=https://apps.lib.kth.se/jwt/callback.php"
            
        } else {
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
    }

    public logout() {
        applicationSettingsModule.remove('jwttoken');
        this.loggedin = false;
    }

    public userinfo() {
        this.router.navigate(["/userinfo"],{ clearHistory: true })
    }

    public almainfo() {
        this.router.navigate(["/almainfo"],{ clearHistory: true })
    }

    public mrbs() {
        this.router.navigate(["/mrbs"],{ clearHistory: true })
    }

    public testpage1() {
        this.router.navigate(["/testpage1"],{ clearHistory: true })
    }

    public authcallback() {
    }
}