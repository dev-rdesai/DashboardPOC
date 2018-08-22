
import { Component, OnInit,AfterViewInit, ViewChildren, Compiler, Injector, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import * as AngularCommon from '@angular/common';
import * as AngularCore from '@angular/core';
import { ModuleService } from './services/module.services';
import { ModuleData } from './models/module.model';
import 'rxjs/add/operator/do';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
   
  title = 'app';
  installedModules$: any;
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  @ViewChildren('12', { read: ViewContainerRef }) loadContentHere;


  constructor(
      private compiler: Compiler,
      private injector: Injector,
      private componentFactoryResolver: ComponentFactoryResolver,
      private moduleService: ModuleService
  ) {
    this.installedModules$ = this.moduleService.loadModules();
   }

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

  
}
ngAfterViewInit(): void {
 
  this.installedModules$.forEach((x,i) =>{
      this.registerRoute(x,i);
  });
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

  private registerRoute(moduleToEnable: ModuleData, i:any){
    // load up the umd file and register the route whenever succeeded.
    this.moduleService.loadModuleSystemJS(moduleToEnable).then((exports) => {

       let moduleRef = exports.ngModuleFactory.create(this.injector);
                    let factory = exports.componentFactories[exports.componentFactories.length - 1];
                    if (factory) {
                        let component = this.loadContentHere._results[i].createComponent(factory);
                        let instance = component.instance;
                    }
    }, (err) => this.showError(`${moduleToEnable.moduleName} could not be found, did you copy the umd file to ${moduleToEnable.location}?`, err));
  }

  private showError(message: string, err) {
    console.log(err); // Log error in console
  }
}
