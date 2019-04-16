import { Component, OnInit } from '@angular/core';
import { TranslateService } from './../../translator/translate.service';
@Component({
  selector: 'app-translator-test',
  templateUrl: './translator-test.component.html',
  styleUrls: ['./translator-test.component.less']
})
export class TranslatorTestComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  setLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {}
}
