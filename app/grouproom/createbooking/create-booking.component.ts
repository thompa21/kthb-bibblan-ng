import { Component, OnInit, ViewChild } from "@angular/core";

import { HttpGetService } from "../../shared/http-get/http-get.services";
import * as applicationSettingsModule from "application-settings";

import { RouterExtensions } from "nativescript-angular/router";

import {ActivatedRoute} from '@angular/router'

import {Page} from "ui/page";

@Component({
    selector: "Grouproom",
    moduleId: module.id,
    templateUrl: "./grouproom.component.html",
    providers: [HttpGetService]
})

export class CreateBookingComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    constructor(
        private routerExtensions: RouterExtensions,
        private page: Page,
        private GetService: HttpGetService,
        private route:ActivatedRoute,
    ) {
        
    }

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this.page.actionBarHidden = true;

        this.route.params.subscribe(params => {
            //this.item_id = params['id'];
            //this.country = this.data_source.get_data(this.item_id);
          })
    }
/*
    createBooking() {
        this.GetService.createBooking(name,create_by,start_time,end_time,entry_type,room_id,modified_by,type,status,lang)
            .subscribe(
                (result) => {
                this.bookings = result;

                console.log(JSON.stringify(this.bookings));
            }, (error) => {
                console.log(error);
            });
    }
*/
}