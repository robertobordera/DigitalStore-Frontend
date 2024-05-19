import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceFormComponent } from './market-place-form.component';

describe('MarketPlaceFormComponent', () => {
  let component: MarketPlaceFormComponent;
  let fixture: ComponentFixture<MarketPlaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPlaceFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketPlaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
