import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNowModalComponent } from './start-now-modal.component';

describe('StartNowModalComponent', () => {
  let component: StartNowModalComponent;
  let fixture: ComponentFixture<StartNowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartNowModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartNowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
