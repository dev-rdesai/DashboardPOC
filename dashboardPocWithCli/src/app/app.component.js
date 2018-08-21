"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AngularCommon = require("@angular/common");
var AngularCore = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(compiler, injector, componentFactoryResolver) {
        this.compiler = compiler;
        this.injector = injector;
        this.componentFactoryResolver = componentFactoryResolver;
        this.title = 'app';
    }
    AppComponent_1 = AppComponent;
    AppComponent.itemChange = function (item, itemComponent) {
        console.info('itemChanged', item, itemComponent);
    };
    AppComponent.itemResize = function (item, itemComponent) {
        console.info('itemResized', item, itemComponent);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.options = {
            itemChangeCallback: AppComponent_1.itemChange,
            itemResizeCallback: AppComponent_1.itemResize,
            swap: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true
            },
            ignoreMarginInRow: true
        };
        this.dashboard = [
            { cols: 2, rows: 1, y: 0, x: 1, name: '1st widget', id: '12', url: 'my.module.js', baseURL: 'https://raw.githubusercontent.com/mrmscmike/ngx-dynamic-module-loader/master/src/' },
            { cols: 2, rows: 1, y: 1, x: 0, name: '2nd widget', id: '13', url: 'employee-grid.umd.min.js', baseURL: 'http://10.131.20.133:8081/' }
        ];
    };
    AppComponent.prototype.changedOptions = function () {
        this.options.api.optionsChanged();
    };
    AppComponent.prototype.removeItem = function (item) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    };
    AppComponent.prototype.addItem = function () {
        this.dashboard.push({ cols: 2, rows: 3, y: 1, x: 1 });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        // register the modules that we already loaded so that no HTTP request is made
        // in my case, the modules are already available in my bundle (bundled by webpack)
        SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
        SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
        this.importWidgets(0);
        //SystemJS.import('webpack://./src/app/app.module.js').then((module) => {
        //    this.compiler.compileModuleSync(module.default);
        //    setTimeout(() => {
        //        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetComponent);
        //        let viewContainerRef = this.loadContentHere._results[0];
        //        viewContainerRef.clear();
        //        let componentRef = viewContainerRef.createComponent(componentFactory);
        //        (<WidgetComponent>componentRef.instance).widget = { name: 'My new widget component' };
        //    }, 1000);
        //}
    };
    AppComponent.prototype.importWidgets = function (i) {
        var _this = this;
        SystemJS.config({
            baseURL: this.dashboard[i].baseURL
        });
        // now, import the new module
        SystemJS.import(this.dashboard[i].baseURL + this.dashboard[i].url).then(function (module) {
            _this.compiler.compileModuleAndAllComponentsAsync(module.default)
                .then(function (compiled) {
                var moduleRef = compiled.ngModuleFactory.create(_this.injector);
                var factory = compiled.componentFactories[compiled.componentFactories.length - 1];
                if (factory) {
                    var component = _this.loadContentHere._results[i].createComponent(factory);
                    var instance = component.instance;
                }
                if (i < _this.dashboard.length - 1) {
                    _this.importWidgets(i + 1);
                }
            });
        });
    };
    AppComponent.prototype.systemJSImport = function (i) {
        //SystemJS.import(`${this.dashboard[i].baseURL + this.dashboard[i].url}`).then((module) => {
        //    console.log(module);
        //    return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
        //        console.log(compiled);
        //        return module;
        //    });
        //});
    };
    var AppComponent_1;
    __decorate([
        core_1.ViewChildren('12', { read: core_1.ViewContainerRef })
    ], AppComponent.prototype, "loadContentHere", void 0);
    AppComponent = AppComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
