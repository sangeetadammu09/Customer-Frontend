import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/shared/service/master.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
  }

  logout(){
    this.masterService.isLoggedOut();
  }

}
