import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-breadcrumbs',
  templateUrl: './account-breadcrumbs.component.html',
  styleUrls: ['./account-breadcrumbs.component.scss']
})

// AccountBreadcrumbs Component
export class AccountBreadcrumbsComponent implements OnInit {

  userName: any;
  urlImage: any; 

  constructor() { }

  ngOnInit(): void {

      this.userName = localStorage.getItem('userName');
      this.urlImage = localStorage.getItem('urImage');
  }
}