import { Observable } from 'rxjs/Observable';
import { ModuleData } from './../models/module.model';
import { Http } from '@angular/http';
import { Injectable, Compiler, Inject, ReflectiveInjector, Injector, COMPILER_OPTIONS } from '@angular/core';

import 'rxjs/add/operator/map';

// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as AngularForms from '@angular/forms';
import * as AngularMaterial from '@angular/material';
import * as AngularHttpClient from '@angular/common/http';
//import * as AngularMaterialDialog from '@angular/material/dialog';
// import * as AngularClarity from '@clr/angular';
import * as BrowserAnimations from '@angular/platform-browser/animations';

declare var SystemJS: any;

@Injectable()
export class ModuleService {
    //source = `http://${window.location.host}/`;
    source = `http://localhost:8081/`;

    constructor(private compiler: Compiler, private http: Http) {
        console.log(compiler);
    }

    loadModules(): any {
        return [
            {
                "path": "appmodule",
                "location": "http://localhost:4221/header.umd.js",
                "moduleName": "HeaderModule",
                "description": "Header",
                "registered": false,
                "shouldSendDataToContent": true,
                "dataInKeysAndFunctions": [{name: 'assetsLocation', evalFunction: function(instance){
                    instance.assetsLocation = 'http://localhost:4221/';
                }}],
                shouldReceiveDataFromContent: false,
                dataOutKeysAndFunctions: [],
                loadComponentName: 'lib-header',
                x:0,
                y:0,
                cols: 50,
                rows: 3,
                resizeEnabled: false,
                dragEnabled: false,
                compactEnabled: false
            },
            {
                "path": "modulea",
                "location": "http://localhost:4221/modulea.umd.js",
                "moduleName": "ModuleaModule",
                "description": "Payroll",
                "registered": false,
                shouldSendDataToContent: false,
                dataInKeysAndFunctions: [],
                shouldReceiveDataFromContent: false,
                dataOutKeysAndFunctions: [],
                x:0,
                y:3,
                cols: 3,
                rows: 1,
                resizeEnabled: true,
                dragEnabled: true,
                compactEnabled: true
            },
            {
                "path": "appmodule",
                "location": "http://localhost:4221/hr-module.umd.js",
                "moduleName": "AppModule",
                "description": "HR",
                "registered": false,
                "shouldSendDataToContent": true,
                "dataInKeysAndFunctions": [{name: 'counterVal', evalFunction: function(instance){
                    setInterval(() => {
                        instance.counterVal++;
                    }, 1000);
                }}],
                shouldReceiveDataFromContent: true,
                dataOutKeysAndFunctions: [{name: 'emitClickCounts', evalFunction: function(event){
                    console.log("clicked inside HR content - " + event);
                }}],
                x:1,
                y:1,
                cols: 3,
                rows: 1,
                resizeEnabled: true,
                dragEnabled: true,
                compactEnabled: true
            },
            {
                "path": "appmodule",
                "location": "http://localhost:4221/messager.umd.js",
                "moduleName": "MessagerModule",
                "description": "Messenger",
                "registered": false,
                "shouldSendDataToContent": true,
                "dataInKeysAndFunctions": [{name: 'myId', evalFunction: function(instance){
                    instance.myId = 3;
                }}],
                shouldReceiveDataFromContent: false,
                dataOutKeysAndFunctions: [],
                loadComponentName: 'lib-messager',
                x:1,
                y:1,
                cols: 3,
                rows: 1,
                resizeEnabled: true,
                dragEnabled: true,
                compactEnabled: true
            },
            {
                "path": "appmodule",
                "location": "http://localhost:4221/messager.umd.js",
                "moduleName": "MessagerModule",
                "description": "Messenger",
                "registered": false,
                "shouldSendDataToContent": true,
                "dataInKeysAndFunctions": [{name: 'myId', evalFunction: function(instance){
                    instance.myId = 4;
                }}],
                shouldReceiveDataFromContent: false,
                dataOutKeysAndFunctions: [],
                loadComponentName: 'lib-messager',
                x:1,
                y:1,
                cols: 3,
                rows: 1,
                resizeEnabled: true,
                dragEnabled: true,
                compactEnabled: true
            },
            {
                "path": "appmodule",
                "location": "http://localhost:4221/messager.umd.js",
                "moduleName": "MessagerModule",
                "description": "Messenger",
                "registered": false,
                "shouldSendDataToContent": true,
                "dataInKeysAndFunctions": [{name: 'myId', evalFunction: function(instance){
                    instance.myId = 5;
                }}],
                shouldReceiveDataFromContent: false,
                dataOutKeysAndFunctions: [],
                loadComponentName: 'lib-messager',
                x:1,
                y:1,
                cols: 3,
                rows: 1,
                resizeEnabled: true,
                dragEnabled: true,
                compactEnabled: true
            },
            {
                "path": "appmodule",
                "location": "http://localhost:4221/messager.umd.js",
                "moduleName": "MessagerModule",
                "description": "Messenger",
                "registered": false,
                "shouldSendDataToContent": true,
                "dataInKeysAndFunctions": [{name: 'myId', evalFunction: function(instance){
                    instance.myId = 6;
                }}],
                shouldReceiveDataFromContent: false,
                dataOutKeysAndFunctions: [],
                loadComponentName: 'lib-messager',
                x:1,
                y:1,
                cols: 3,
                rows: 1,
                resizeEnabled: true,
                dragEnabled: true,
                compactEnabled: true
            }
        ];
        // return this.http.get("./assets/modules.json")
        //     .map(res => res.json());
    }

    loadModule(moduleInfo: ModuleData): Observable<any> {
        let url = this.source + moduleInfo.location;
        return this.http.get(url)
            .map(res => res.text())
            .map(source => {
                const exports = {}; // this will hold module exports
                const modules = {   // this is the list of modules accessible by plugins
                    '@angular/core': AngularCore,
                    '@angular/common': AngularCommon,
                    '@angular/router': AngularRouter,
                    '@angular/platform-browser/animations': BrowserAnimations,
                    '@angular/forms': AngularForms
                    // '@clr/angular': AngularClarity
                };

                // shim 'require' and eval
                const require: any = (module) => modules[module];
                eval(source);

                // Need to check if there is another solution for eval as this is described as 'Evil'

                this.compiler.compileModuleAndAllComponentsSync(exports[`${moduleInfo.moduleName}`])
                //console.log(exports); // disabled as this object is cleared anyway
                return exports;
            });
    }

    loadModuleSystemJS(moduleInfo: ModuleData): Promise<any> {
        let url = moduleInfo.location;
        SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
        SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
        SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
        SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
        SystemJS.set('@angular/forms', SystemJS.newModule(AngularForms));
        SystemJS.set('@angular/material', SystemJS.newModule(AngularMaterial));
        SystemJS.set('@angular/common/http', SystemJS.newModule(AngularHttpClient));
        //SystemJS.set('@angular/material/dialog', SystemJS.newModule(AngularMaterialDialog));
        //SystemJS.set('@clr/angular', SystemJS.newModule(AngularClarity));

        // now, import the new module
        return SystemJS.import(`${url}`).then((module) => {
            return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
                return compiled;
            });
        });
    }
}