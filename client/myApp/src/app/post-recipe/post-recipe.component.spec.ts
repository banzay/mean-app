import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecipeComponent } from './post-recipe.component';

describe('PostRecipeComponent', () => {
  let component: PostRecipeComponent;
  let fixture: ComponentFixture<PostRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
