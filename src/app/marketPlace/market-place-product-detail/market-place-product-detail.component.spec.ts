import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceProductDetailComponent } from './market-place-product-detail.component';

describe('MarketPlaceProductDetailComponent', () => {
  let component: MarketPlaceProductDetailComponent;
  let fixture: ComponentFixture<MarketPlaceProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPlaceProductDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketPlaceProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
