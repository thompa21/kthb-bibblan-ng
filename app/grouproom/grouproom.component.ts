import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { HttpGetService } from "../shared/http-get/http-get.services";
import * as applicationSettingsModule from "application-settings";

import { RouterExtensions } from "nativescript-angular/router";

import {Page} from "ui/page";

@Component({
    selector: "Grouproom",
    moduleId: module.id,
    templateUrl: "./grouproom.component.html",
    providers: [HttpGetService]
})

export class GrouproomComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public myItems: Array<any>;

    constructor(
        private routerExtensions: RouterExtensions,
        private page: Page,
        private GetService: HttpGetService
    ) {
        this.myItems = [];
        
        for (var i = 0; i < 50; i++) {
            this.myItems.push({
                roomnumber: 'Hello',
                roomname: 'world',
              });
        }
        console.dir(this.myItems);
        
    }

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this._sideDrawerTransition = new SlideInOnTopTransition();
        //this.getRoomBookings();
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

    getRoomBookings() {
        this.GetService.getRoomBookings('2018-04-06')
            .subscribe(
                (result) => {
                console.dir(result);
                this.myItems = result;
            }, (error) => {
                console.log(error);
            });
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }
}
