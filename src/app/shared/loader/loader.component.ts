import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;

  public loading = false;

  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      console.log('heeey');
      this.loading = true;
    }, 5000);

  }

}
