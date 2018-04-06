import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { GrouproomComponent } from "./grouproom.component";

const routes: Routes = [
    { path: "", component: GrouproomComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class GrouproomRoutingModule { }
