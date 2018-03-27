import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any;

  sortNewDisabled = true;
  sortOldDisabled = false;

  constructor(private data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3030/api/products?date=new');
      data['success']
        ? (this.products = data['products'])
        : this.data.error('Could not fetch products.');
    } catch (error) {
      this.data.error(error['message']);
    }
    this.sortNewDisabled = true;
    this.sortOldDisabled = false;
  }

  async sortBy(type){
    this.products = null;
    try {
      const data = await this.rest.get('http://localhost:3030/api/products?date=' + type);
      data['success']
        ? (this.products = data['products'])
        : this.data.error('Could not fetch products.');
    } catch (error) {
      this.data.error(error['message']);
    }
    if(type=='new'){
      this.sortNewDisabled = true;
      this.sortOldDisabled = false;
    } else {
      this.sortNewDisabled = false;
      this.sortOldDisabled = true;
    }
  }
}
