import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-destroy-dialog',
  templateUrl: './destroy-dialog.component.html',
  styleUrls: ['./destroy-dialog.component.css']
})
export class DestroyDialogComponent implements OnInit {

  constructor(private _connectionService: ConnectionService) { }

  ngOnInit(): void {
  }

  destroy(){
    this._connectionService.charityETH.methods.destroy().send({from: this._connectionService.access});
  }

}
