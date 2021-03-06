import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { HttpGetService } from "../shared/http-get/http-get.services";
import * as applicationSettingsModule from "application-settings";

import { RouterExtensions } from "nativescript-angular/router";

import {Page} from "ui/page";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [HttpGetService]
})

export class HomeComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    loggedin: boolean = false;

    constructor(
        private routerExtensions: RouterExtensions,
        private page: Page,
        private GetService: HttpGetService
    ) {

    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log("jwttoken in Home-page: " + applicationSettingsModule.getString('jwttoken', 'unset'));
        if (applicationSettingsModule.getString('jwttoken', 'unset') !== 'unset'){
            this.GetService.checkJWT()
            .subscribe(
                (result) => {
                if(result.authorized) {
                    this.loggedin = true;
                } else {
                    this.loggedin = false;
                    this.routerExtensions.navigate(["login"],{ clearHistory: true })
                }
            }, (error) => {
                console.log(error);
                //this.loggedin = false;
                this.routerExtensions.navigate(["login"],{ clearHistory: true })
            });
        } else {
            this.routerExtensions.navigate(["login"],{ clearHistory: true });
        }
    } 

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
    }
}
