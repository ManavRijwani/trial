import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecityComponent } from './updatecity.component';

describe('UpdatecityComponent', () => {
  let component: UpdatecityComponent;
  let fixture: ComponentFixture<UpdatecityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatecityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
