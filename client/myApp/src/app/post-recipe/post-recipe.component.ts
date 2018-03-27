import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-recipe',
  templateUrl: './post-recipe.component.html',
  styleUrls: ['./post-recipe.component.scss']
})
export class PostRecipeComponent implements OnInit {

  product = {
    title: '',
    description: ''
  };

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  ngOnInit() { }

  validate(product) {
    if (product.title) {
      if (product.description) {
        return true;
      } else {
        this.data.error('Please enter a description.');
      }
    } else {
      this.data.error('Please enter a title.');
    }
  }

  async post() {
    try {
      if (this.validate(this.product)) {
        const sendData = {
          title: this.product.title,
          description: this.product.description
        }

        // console.log(form);
        const data = await this.rest.post(
          'http://localhost:3030/api/products',
          sendData
        );
        data['success']
          ? this.router.navigate([''])
            .then(() => this.data.success(data['message']))
            .catch(error => this.data.error(error))
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
