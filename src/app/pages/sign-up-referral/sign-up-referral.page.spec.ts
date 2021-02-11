import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpReferralPage } from './sign-up-referral.page';

describe('SignUpReferralPage', () => {
  let component: SignUpReferralPage;
  let fixture: ComponentFixture<SignUpReferralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpReferralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpReferralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
