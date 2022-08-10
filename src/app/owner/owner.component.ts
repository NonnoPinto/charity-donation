import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionService } from '../connection.service';
import { DestroyDialogComponent } from '../destroy-dialog/destroy-dialog.component';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  constructor(private _connectionService: ConnectionService, public dialog: MatDialog) { }

  nameC: any;
  addressC: any;
  nameP: any;
  addressP: any;

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DestroyDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  create(){
    /* console.log("Dettagli: ", this.nameC, this.addressC, this.nameP, this.addressP); */
    this._connectionService.charityETH.methods.addCharity(this.nameC, this.addressC, this.nameP, this.addressP).send({from: this._connectionService.access});
  }
}
