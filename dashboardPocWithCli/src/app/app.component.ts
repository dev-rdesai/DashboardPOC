import { Component, OnInit, ViewChildren, Compiler, Injector, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import * as AngularCommon from '@angular/common';
import * as AngularCore from '@angular/core';

declare var SystemJS;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    options: GridsterConfig;
    dashboard: Array<GridsterItem>;
    @ViewChildren('12', { read: ViewContainerRef }) loadContentHere;

    constructor(
        private compiler: Compiler,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    static itemChange(item, itemComponent) {
        console.info('itemChanged', item, itemComponent);
    }

    static itemResize(item, itemComponent) {
        console.info('itemResized', item, itemComponent);
    }

    ngOnInit() {
        this.options = {
            itemChangeCallback: AppComponent.itemChange,
            itemResizeCallback: AppComponent.itemResize,
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
    }

    changedOptions() {
        this.options.api.optionsChanged();
    }

    removeItem(item) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    addItem() {
        this.dashboard.push({ cols: 2, rows: 3, y: 1, x: 1 });
    }

    ngAfterViewInit() {
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
    }

    importWidgets(i) {
        SystemJS.config({
            baseURL: this.dashboard[i].baseURL
        });

        // now, import the new module
        SystemJS.import(this.dashboard[i].baseURL + this.dashboard[i].url).then((module) => {
            this.compiler.compileModuleAndAllComponentsAsync(module.default)
                .then((compiled) => {
                    let moduleRef = compiled.ngModuleFactory.create(this.injector);
                    let factory = compiled.componentFactories[compiled.componentFactories.length - 1];
                    if (factory) {
                        let component = this.loadContentHere._results[i].createComponent(factory);
                        let instance = component.instance;
                    }
                    if (i < this.dashboard.length - 1) {
                        this.importWidgets(i + 1);
                    }
                });
        });
    }

    systemJSImport(i) {
        //SystemJS.import(`${this.dashboard[i].baseURL + this.dashboard[i].url}`).then((module) => {
        //    console.log(module);
        //    return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
        //        console.log(compiled);
        //        return module;
        //    });
        //});
    }

}

