import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorDeleteComponent } from './actor-delete.component';

describe('ActorDeleteComponent', () => {
  let component: ActorDeleteComponent;
  let fixture: ComponentFixture<ActorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
