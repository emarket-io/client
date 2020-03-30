import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Memo } from '../../../../../sdk/user_pb';
import { apiService, utilsService } from '../../../../providers/utils.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss'],
})
export class SaveComponent {
  @Input() memo: Memo;

  constructor(private popoverController: PopoverController) { }

  save() {
    if (!this.memo.content) {
      return utilsService.alert('内容为空');
    }
    this.memo.userId = utilsService.getUser().id;
    if (this.memo.id != "") {
      apiService.memoClient.update(this.memo, apiService.metaData).then(memo => {
        this.memo = memo;
        this.popoverController.dismiss(memo);
      }).catch(err => {
        utilsService.alert(err.message);
      });
    } else {
      apiService.memoClient.add(this.memo, apiService.metaData).then(memo => {
        this.memo = memo;
        this.popoverController.dismiss(memo);
      }).catch(err => {
        utilsService.alert(err.message);
      });
    };
  }

  close() {
    this.popoverController.dismiss();
  }
}
