import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailProductComponent } from './store-detail-product.component';

describe('StoreDetailProductComponent', () => {
  let component: StoreDetailProductComponent;
  let fixture: ComponentFixture<StoreDetailProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreDetailProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreDetailProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
