import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeasonComponent } from './show-season.component';

describe('ShowSeasonComponent', () => {
  let component: ShowSeasonComponent;
  let fixture: ComponentFixture<ShowSeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
