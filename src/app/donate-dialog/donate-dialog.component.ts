import { Component, Inject, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-donate-dialog',
  templateUrl: './donate-dialog.component.html',
  styleUrls: ['./donate-dialog.component.css']
})
export class DonateDialogComponent implements OnInit {

  constructor(private _connectionService: ConnectionService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  donate(){
    let weiAmount = this._connectionService.web3.utils.toWei(this.data.amount);
    this._connectionService.charityETH.methods.donate(this.data.charity, this.data.project).send({from: this._connectionService.access, value: weiAmount});
  }

}
