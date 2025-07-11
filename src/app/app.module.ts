import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DateModalComponent } from './date-modal/date-modal.component';
import { SharedService } from './services/shared.service';
@NgModule({
  declarations: [AppComponent,DateModalComponent],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    // StatusBar,
    // SplashScreen,
    SharedService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
