import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  product: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest
        .get(`http://localhost:3030/api/products/${res['id']}`)
        .then(data => {
          data['success']
            ? (this.product = data['product'])
            : this.router.navigate(['/']);
        })
        .catch(error => this.data.error(error['message']));
    });
  }

  async update() {
    console.log(this.product);
    // return;
    const data = await this.rest.put(
      'http://localhost:3030/api/products/' + this.product._id,
      {
        title: this.product.title,
        description: this.product.description
      },
    );
    if (data['success']) {
      location.reload();
    } else {
      this.data.error(data['message']);
    }
  }

}
