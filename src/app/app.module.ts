import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { ScrollEventModule } from 'ngx-scroll-event';

import { AuthService } from './services/auth.service';
import { RequireAnonGuardService } from './guards/require-anon-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';
import { InitAuthGuardService } from './guards/init-auth-guard.service';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';

import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { CompanyPublicComponent } from './components/company-public/company-public.component';
import { CompanyPrivateComponent } from './components/company-private/company-private.component';

import { IgDatauserService } from './services/ig-datauser.service';
import { TwtDatauserService } from './services/twt-datauser.service';
import { AppPageComponent } from './pages/app-page/app-page.component';
import { InstagramInfoComponent } from './components/instagram-info/instagram-info.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { CompanyService } from './services/company.service';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { CampaignDetailComponent } from './components/campaign-detail/campaign-detail.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';
import { TwitterInfoComponent } from './components/twitter-info/twitter-info.component';
import { YoutubeInfoComponent } from './components/youtube-info/youtube-info.component';
import { YoutubeDatauserService } from './services/youtube-datauser.service';
import { EditInfluencerComponent } from './components/edit-influencer/edit-influencer.component';
import { InfluencerService } from './services/influencer.service';
import { ToasterService } from './services/toaster.service';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';
import { EditImageCoverComponent } from './components/edit-image-cover/edit-image-cover.component';
import { TagsComponent } from './components/tags/tags.component';
import { FilterTagsPipe } from './pipes/filter-tags.pipe';
import { MsgSendComponent } from './components/msg-send/msg-send.component';
import { MsgService } from './services/msg.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [InitAuthGuardService],
    children: [
      {
        path: 'signup',
        component: SignupComponent,
        canActivateChild: [RequireAnonGuardService]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivateChild: [RequireAnonGuardService]
      },
    ]
  },
  {
    path: 'app/:id',
    component: AppPageComponent,
    canActivate: [RequireUserGuardService]
  },
  {
    path: 'app/:id/edit-profile',
    component: EditInfluencerComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: 'company/:id',
    component: CompanyProfileComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: 'company/:id/edit-profile',
    component: EditCompanyComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: 'company/:id/new-campaign',
    component: CreateCampaignComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: 'company/:id/:campaignid',
    component: CampaignDetailComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: 'company/:id/:campaignid/edit',
    component: EditCampaignComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: 'campaigns',
    component: CampaignsComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: 'campaigns/me',
    component: CampaignsComponent,
    canActivate: [RequireUserGuardService],
  },
  {
    path: '**', redirectTo: '',
  },
];


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    MobileMenuComponent,
    ModalComponent,
    AppPageComponent,
    InstagramInfoComponent,
    CompanyProfileComponent,
    CreateCampaignComponent,
    EditCompanyComponent,
    CampaignDetailComponent,
    EditCampaignComponent,
    TwitterInfoComponent,
    YoutubeInfoComponent,
    EditInfluencerComponent,
    CompanyPublicComponent,
    CompanyPrivateComponent,
    CampaignsComponent,
    FileSelectDirective,
    CampaignCardComponent,
    EditImageCoverComponent,
    TagsComponent,
    FilterTagsPipe,
    MsgSendComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    PasswordStrengthBarModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TagInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ScrollEventModule,
  ],
  providers: [
    IgDatauserService,
    TwtDatauserService,
    YoutubeDatauserService,
    CompanyService,
    InfluencerService,
    AuthService,
    RequireUserGuardService,
    RequireAnonGuardService,
    InitAuthGuardService,
    ToasterService,
    MsgService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
