import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitydetailComponent } from './citydetail.component';

describe('CitydetailComponent', () => {
  let component: CitydetailComponent;
  let fixture: ComponentFixture<CitydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitydetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
