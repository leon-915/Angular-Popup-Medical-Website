import { Component, OnInit } from '@angular/core';
import {APIResponse, Content} from './../../models/index';
import {ContentService} from './../../services/index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  content: Content;

  constructor(private contentSrv: ContentService) {

   }

  ngOnInit() {
      this.contentSrv.getPatientEducation(1, 'asd').subscribe(result => {
          this.content = result;
      });

  }

}
