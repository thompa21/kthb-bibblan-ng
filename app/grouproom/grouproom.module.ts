import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { GrouproomRoutingModule } from "./grouproom-routing.module";
import { GrouproomComponent } from "./grouproom.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GrouproomRoutingModule,
        SharedModule
    ],
    declarations: [
        GrouproomComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GrouproomModule { }
