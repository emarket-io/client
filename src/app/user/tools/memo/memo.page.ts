import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Memo } from '../../../../sdk/user_pb';
import { PopoverController } from '@ionic/angular';
import { SaveComponent } from './save/save.component';
import { apiService, utilsService } from '../../../providers/utils.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage {
  memos: Memo[] = [];
  now = new Date();
  location = utilsService.location.addressComponent.province + utilsService.location.addressComponent.city;
  timeOutEvent;

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

  async save(memo: Memo = new Memo()) {
    memo.location = this.location;
    let popover = await this.popoverController.create({
      component: SaveComponent,
      backdropDismiss: false,
      componentProps: { memo: memo },
      cssClass: 'bottom-sheet-popover',
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if (data) {
      this.ionViewWillEnter();
    }
  }

  touchstart(item: Memo) {
    this.timeOutEvent = setTimeout(() => {
      utilsService.confirm('删除' + item.title + '？', () => {
        apiService.memoClient.delete(item, apiService.metaData).then(() => {
          this.ionViewWillEnter();
        }).catch(err => {
          utilsService.alert(err);
        });
      })
    }, 500);
  }

  touchend() {
    clearTimeout(this.timeOutEvent);
  }
}
