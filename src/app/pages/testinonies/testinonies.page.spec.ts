import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestinoniesPage } from './testinonies.page';

describe('TestinoniesPage', () => {
  let component: TestinoniesPage;
  let fixture: ComponentFixture<TestinoniesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestinoniesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestinoniesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
