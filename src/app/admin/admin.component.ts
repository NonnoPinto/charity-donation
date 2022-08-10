import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _connectionService: ConnectionService) { }

  nameP: any;
  addressP: any;

  ngOnInit(): void {
  }

  create(){
    this._connectionService.charityETH.methods.addProject(this.nameP, this.addressP).send({from: this._connectionService.access});
  }

}
