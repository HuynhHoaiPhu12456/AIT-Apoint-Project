import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardInventorySearchComponent } from './reward-inventory-search.component';

describe('RewardInventorySearchComponent', () => {
  let component: RewardInventorySearchComponent;
  let fixture: ComponentFixture<RewardInventorySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardInventorySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardInventorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
