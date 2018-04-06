import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { Data } from "./shared/providers/data";

import { NativeScriptHttpModule } from "nativescript-angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        Data
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
