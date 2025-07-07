import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false
})
export class AppComponent {


  lastTimeBackPress:number = 0;
  timePeriodToExit:number = 2000;
  constructor(
    private platform: Platform,
    // private statusBar: StatusBar,
    private router: Router,
    private alertCtrl: AlertController,
  ) {
    this.initializeApp();
    this.handleHardwareBackButton();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
     setTimeout(() => {
      SplashScreen.hide();
    }, 2000); // Optional: delay hiding
    });
  }
count:number=0
private handleHardwareBackButton(): void {
  this.platform.backButton.subscribeWithPriority(9999, () => {
   this.count++
    console.log(this.count, 'this.count++');
   if(this.count === 1){
     this.showConfirm('Do you want to exit ');
   }
  });
}
//
async showConfirm(title :any) { 
  console.log('coming',title)
  const confirm = await this.alertCtrl.create({
    header: title,
    //   message: message,
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          this.count=0;
          console.log('Disagree clicked');
        }
      },
      {
        text: 'ok',
        handler: () => {
          App.exitApp();
        }
      }
    ]
  });
  await confirm.present();
}

}
