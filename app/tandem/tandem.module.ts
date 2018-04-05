import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { TandemRoutingModule } from "./tandem-routing.module";
import { TandemComponent } from "./tandem.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TandemRoutingModule,
        SharedModule
    ],
    declarations: [
        TandemComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TandemModule { }
