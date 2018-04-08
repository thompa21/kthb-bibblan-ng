import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CreateBookingComponent } from "./create-booking.component";

const routes: Routes = [
    { path: "createbooking/:id", component: CreateBookingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GrouproomRoutingModule { }