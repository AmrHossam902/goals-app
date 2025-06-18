import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalNodeComponent } from './goal-node.component';

describe('GoalNodeComponent', () => {
  let component: GoalNodeComponent;
  let fixture: ComponentFixture<GoalNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
