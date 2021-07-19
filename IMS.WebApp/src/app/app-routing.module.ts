import { NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ListDocumentComponent } from './components/document/list-document/list-document.component';
import { SharedocumentComponent } from './components/sharedocument/sharedocument.component';

import { Auth2Service } from 'src/app/services/auth.service';
import { ImageCanvasComponent } from './components/image-canvas/image-canvas.component';

const routes: Routes = [];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'documents', component: ListDocumentComponent },
      { path: 'sharedocuments', component: SharedocumentComponent }, // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'draw', component: ImageCanvasComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
