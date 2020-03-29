import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Memo } from '../../../../sdk/user_pb';
import { AddComponent } from './add/add.component';
import { PopoverController } from '@ionic/angular';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage {
  memos: Memo[] = [];
  now = new Date();

  constructor(
    private router: Router,
    private popoverController: PopoverController) { }

  ionViewWillEnter() {
    if (!utilsService.getUser()) {
      return this.router.navigateByUrl('/login');
    }
    let newMemos = [];
    let stream = apiService.memoClient.list(utilsService.getUser(), apiService.metaData);
    stream.on('data', response => {
      if (!this.memos.some(item => item.id == response.id)) {
        this.memos.push(response);
      }
      newMemos.push(response);
    });
    stream.on('error', err => {
      utilsService.alert(JSON.stringify(err));
    });
    stream.on('end', () => {
      this.memos = newMemos;
    });
  }

  async add(memo: Memo = new Memo()) {
    let popover = await this.popoverController.create({
      component: AddComponent,
      //backdropDismiss:false,
      componentProps: { memo: memo },
      cssClass: 'bottom-sheet-popover',
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {
      this.ionViewWillEnter();
    }
  }

  remove(item: Memo) {
    apiService.memoClient.delete(item, apiService.metaData).catch(err => {
      utilsService.alert(err);
    });
  }
}
