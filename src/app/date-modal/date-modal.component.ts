import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonCard, IonContent, IonDatetime, IonButton } from "@ionic/angular/standalone";
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.scss'],
  standalone: false
})
export class DateModalComponent implements OnInit {
  @Input() selectedDate: any = '';
  tempDate: string = '';
  constructor(
    private modalCtrl: ModalController,
    private sharedService: SharedService
  ) { }
  ionViewWillEnter() {
    this.sharedService.comingData.subscribe((res) => {
      if (res) this.selectedDate = res
    })
  }
  ngOnInit() {

  }
  onDateChange(event: any) {
    const value = event.detail.value;
    this.tempDate = value;
  }
 
  confirmDate() {
    this.modalCtrl.dismiss(this.tempDate || this.selectedDate);
  }

  cancel() {
    this.modalCtrl.dismiss(null);
  }
}
