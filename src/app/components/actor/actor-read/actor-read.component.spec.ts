import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorReadComponent } from './actor-read.component';

describe('ActorReadComponent', () => {
  let component: ActorReadComponent;
  let fixture: ComponentFixture<ActorReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
