import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPlaceProductComponent } from './market-place-product.component';

describe('MarketPlaceProductComponent', () => {
  let component: MarketPlaceProductComponent;
  let fixture: ComponentFixture<MarketPlaceProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPlaceProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketPlaceProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
