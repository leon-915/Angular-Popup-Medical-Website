import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {SignupService} from '../../services/index';
@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.component.html',
  styleUrls: ['./invoice-generator.component.less']
})
export class InvoiceGeneratorComponent implements OnInit {

  fullBase64 = '';

  constructor(private signupSrv: SignupService ) {

   }



  ngOnInit() {
      this.signupSrv.getInvoicePdf().subscribe(result => {
        this.fullBase64 = result.Result.pdf_base64;
      });

  }

  download() {
    const file = new Blob([], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    const win = window.open();
    win.document.write(`<iframe src="' + this.fullBase64 + '" frameborder="0"
    style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  }

}
