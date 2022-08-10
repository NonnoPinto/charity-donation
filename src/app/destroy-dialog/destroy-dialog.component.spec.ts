import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyDialogComponent } from './destroy-dialog.component';

describe('DestroyDialogComponent', () => {
  let component: DestroyDialogComponent;
  let fixture: ComponentFixture<DestroyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestroyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestroyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
