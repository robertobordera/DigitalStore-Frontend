import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFooterComponent } from './store-footer.component';

describe('StoreFooterComponent', () => {
  let component: StoreFooterComponent;
  let fixture: ComponentFixture<StoreFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
