import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NewDocumentComponent } from './components/document/new-document/new-document.component';
import { EditDocumentComponent } from './components/document/edit-document/edit-document.component';
import { ListDocumentComponent } from './components/document/list-document/list-document.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SharedocumentComponent } from './components/sharedocument/sharedocument.component';
import { ImageCanvasComponent } from './components/image-canvas/image-canvas.component';
import { DataCollectionService } from './services/datacollection.service';
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavMenuComponent,
    RegisterComponent,
    NewDocumentComponent,
    EditDocumentComponent,
    ListDocumentComponent,
    SharedocumentComponent,
    ImageCanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [DataCollectionService, ImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
