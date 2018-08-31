import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalComponentComponent } from './portal-component.component';

describe('PortalComponentComponent', () => {
  let component: PortalComponentComponent;
  let fixture: ComponentFixture<PortalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
