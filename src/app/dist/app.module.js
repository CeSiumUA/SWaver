"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/common/http");
var animations_1 = require("@angular/platform-browser/animations");
var app_material_module_1 = require("./app-material.module");
var firstlab_component_1 = require("./labs/first/firstlab.component");
var forms_1 = require("@angular/forms");
var service_worker_1 = require("@angular/service-worker");
var environment_1 = require("../environments/environment");
var secondlab_component_1 = require("./labs/second/secondlab.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                firstlab_component_1.FirstLabComponent,
                secondlab_component_1.SecondLabComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                app_material_module_1.AppMaterialModule,
                forms_1.FormsModule,
                service_worker_1.ServiceWorkerModule.register('ngsw-worker.js', {
                    enabled: environment_1.environment.production,
                    // Register the ServiceWorker as soon as the app is stable
                    // or after 30 seconds (whichever comes first).
                    registrationStrategy: 'registerWhenStable:30000'
                })
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
