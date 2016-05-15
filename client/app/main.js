"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var app_component_1 = require('./components/app.component');
var phoenix_js_1 = require("phoenix_js");
var pjs = core_1.provide(phoenix_js_1.Socket, { useFactory: function () {
        return new phoenix_js_1.Socket("ws://localhost:4000/socket", {});
    } });
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [pjs]);
//# sourceMappingURL=main.js.map