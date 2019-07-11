import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})

export class WarningModalComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  text: string;

  @Input()
  confirmModal = false;

  result: Subject<boolean> = new Subject<boolean>();

  constructor(public bsModalRef: BsModalRef, private service: BsModalService) {
    service.config.ignoreBackdropClick = true;
    service.config.class = 'modal-lg';
  }

  ngOnInit() {
  }

  confirm() {
    this.result.next(true);
    this.bsModalRef.hide();
  }

  decline() {
    this.result.next(false);
    this.bsModalRef.hide();
  }

}
