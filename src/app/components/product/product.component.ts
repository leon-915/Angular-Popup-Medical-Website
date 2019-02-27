import { Component, OnInit } from '@angular/core';
import {APIResponse, Content} from './../../models/index';
import {ContentService} from './../../services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  content: Content;
  languages: Array<any> = ['en-US'];
  idProduct = 30378;
  language = 'en-US';
  error = '';
  loading = false;

  constructor(private contentSrv: ContentService, private route: ActivatedRoute) {

   }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.idProduct = parseInt(params.get('id'), 10);
        if (this.idProduct) {
          this.getContentPatientEducation();
        }
      });
  }

  getContentPatientEducation() {
    this.loading = true;
    this.error = '';
    this.content = null;
    this.contentSrv.getPatientEducation(this.idProduct, this.language).subscribe(result => {
      this.loading = false;
      if (result.HasError) {
        this.error = result.Message;
      } else {
          this.content = result.Result;
      }
    });
  }

}
