import { Component, OnInit } from '@angular/core';

// Data Get
import { notification } from './data';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

// Notification Component
export class NotificationComponent implements OnInit {

  masterSelected!: boolean;
  allnotification: any;


  constructor() { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Remove header account and wallet button
    document.querySelector('.account')?.classList.add('d-none')
    document.querySelector('.wallet')?.classList.add('d-none')
    document.querySelector('.connectwallet')?.classList.add('d-none')

    //Remove mail subscription footer
    document.querySelector('.footer .bg-dark')?.classList.remove('mt-n10', 'pt-10')
    document.querySelector('.footer.bg-secondary')?.classList.add('d-none')

    // Fetch Data
    this.allnotification = notification
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.allnotification.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

}
