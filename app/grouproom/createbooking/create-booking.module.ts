import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../../shared/shared.module";
import { GrouproomRoutingModule } from "./create-booking-routing.module";
import { CreateBookingComponent } from "./create-booking.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GrouproomRoutingModule,
        SharedModule
    ],
    declarations: [
        CreateBookingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GrouproomModule { }