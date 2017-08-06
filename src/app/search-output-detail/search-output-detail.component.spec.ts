import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOutputDetailComponent } from './search-output-detail.component';

describe('SearchOutputDetailComponent', () => {
  let component: SearchOutputDetailComponent;
  let fixture: ComponentFixture<SearchOutputDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOutputDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOutputDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
