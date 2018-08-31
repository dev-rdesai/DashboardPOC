import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() assetsLocation: string;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:4221/getList').subscribe(response => {
      console.log(response);
    });
  }

}
