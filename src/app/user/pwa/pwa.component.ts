import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pwa',
  templateUrl: './pwa.component.html',
  styleUrls: ['./pwa.component.scss'],
})
export class PwaComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  close() {
    this.popoverController.dismiss();
  }
}
