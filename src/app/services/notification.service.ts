import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class NotificationService {
  constructor(private notifierSrv: NotifierService) { }

  showInfo(message: string) {
    this.notifierSrv.notify('info', message);
  }
  showWarning(message: string) {
    this.notifierSrv.notify('warning', message);
  }
  showSuccess(message: string) {
    this.notifierSrv.notify('success', message);
  }
  showError(message: string) {
    this.notifierSrv.notify('error', message);
  }

  HideNotifications() {
    this.notifierSrv.hideAll();
  }

}
