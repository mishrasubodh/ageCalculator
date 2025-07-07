import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { DateModalComponent } from '../date-modal/date-modal.component';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {
  myDate = new Date().toISOString();
  compareDate = new Date().toISOString();
  years: any;
  months: any;
  days: any;
  data: any
  // from other function
  startDate = new Date().toISOString()
  startdateMoment?: moment.Moment;
  enddateMoment?: moment.Moment;

  constructor(
    public toastController: ToastController,
    private modalCtrl: ModalController,
    private sharedService: SharedService
  ) { }
  async openDateModal() {
    const modal = await this.modalCtrl.create({
      component: DateModalComponent,
      componentProps: { selectedDate: this.myDate },
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.myDate = res.data;
      }
    });

    await modal.present().then(() => {
      this.data = 0;
      this.days = 0 - 1;
      this.sharedService.comingData.next(new Date().toISOString())
    });
  }

  async presentToast(msg: any, position: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      cssClass: 'toastclass',
      position: position || 'top'
    });
    toast.present();
  }
  async birthdayData() {
    if (this.isFutureOrToday(this.myDate)) {
      return this.presentToast('❌ Invalid DOB! Please select a past date.', 'middle');
    }
    this.daysUntil(this.myDate)
    this.startdateMoment = moment(this.myDate);
    this.enddateMoment = moment(this.startDate);
    if (this.startdateMoment.isValid() === true && this.enddateMoment.isValid() === true) {
      this.years = this.enddateMoment.diff(this.startdateMoment, 'years');
      this.months = this.enddateMoment.diff(this.startdateMoment, 'months') - (this.years * 12);
      this.startdateMoment.add(this.years, 'years').add(this.months, 'months');
      this.days = this.enddateMoment.diff(this.startdateMoment, 'days')
      return {
        years: this.years,
        months: this.months,
        days: this.days
      };

    }
    else {
      return undefined;
    }
  }
  daysUntil(date: any) {
    if (this.isBirthdayToday(date)) {
      return this.presentToast(" 🎉 happy birthDay !! today your birthDay ! 🎂", 'middle');
    } else {
      var birthday = moment(date);
      var today = moment().format("YYYY-MM-DD");
      var age = moment(today).diff(birthday, 'years');
      moment(age).format("YYYY-MM-DD");
      var nextBirthday = moment(birthday).add(age, 'years');
      moment(nextBirthday).format("YYYY-MM-DD");
      if (nextBirthday.isSame(today)) {
        return 'Cake!!';
      } else {
        nextBirthday = moment(birthday).add(age + 1, 'years');
        this.data = 'your next birthday will come after' + ' ' + nextBirthday.diff(today, 'days') + ' ' + 'days';

      }
      console.log(this.data);
      return
    }
  }
  isBirthdayToday(dob: any): boolean {
    const today = moment();
    const dobMoment = moment(dob, 'YYYY-MM-DD');
    return (
      today.date() === dobMoment.date() &&
      today.month() === dobMoment.month()
    );
  }
  isFutureOrToday(date: string): boolean {
    const selected = moment(date, 'YYYY-MM-DD');
    const today = moment().startOf('day'); // strip time

    return selected.isSameOrAfter(today);
  }
}



