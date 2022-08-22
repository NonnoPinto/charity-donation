import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { forkJoin, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DonateDialogComponent } from '../donate-dialog/donate-dialog.component';
import { ErrorComponent } from '../error/error.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor(private _connectionService: ConnectionService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  allCharities = [];
  allProject : any = [];
  charitiesMap : Map<String, any> = new Map<String, any>();
  balance: any;
  myCharity: any = "nobody";
  myAmount: any = 0.0001;
  myProject :any = [];

  async ngOnInit(){
    // account balance
    let addr : any = await this._connectionService.web3.eth.getAccounts();
    addr = addr[0];
    await this._connectionService.web3.eth.getBalance(addr).then((value) => this.balance = this._connectionService.web3.utils.fromWei(value, 'ether'));
    /* console.log("Hai ", this._connectionService.web3.utils.fromWei(this.balance, 'ether')); */
    // tutte le associazioni con rispettivi progetti
    this._connectionService.charityETH.methods.getAllCharities().call()
      .then((keys) => {
        this.allCharities = keys;
        for (var i = 0; i < keys.length; i++)
          this.allProject.push(from(this._connectionService.charityETH.methods.getAllProjects(keys[i]).call()));
        forkJoin(this.allProject).subscribe((cicciopaciucco: any) => {
          this.allProject = cicciopaciucco;
          /* console.log("Sono qui ", this.allProject); */
          for (i = 0; i < this.allCharities.length; i++){
            /* console.log(this.allCharities[i], this.allProject[i]); */
            this.charitiesMap.set(this.allCharities[i], this.allProject[i]);
          }
        })
      });
  }

  openDialog(amount, i, charity) {
    /* console.log(amount, this.balance); */
    if(!amount || !this.myProject[i] || !charity){
      const dialogRef = this.dialog.open(ErrorComponent, {
        data: {
          error: "Something went wrong, maybe you didnt chose the project, try again!",
        },
      });
    }
    else if(amount>this.balance){
      const dialogRef = this.dialog.open(ErrorComponent, {
        data: {
          error: "You don't have enough ETH!",
        },
      });
    }
    else{
      let total;
      this._connectionService.charityETH.methods.getDonations(charity, this.myProject[i]).call({from: this._connectionService.access})
        .then((tot) => {
          total = tot;
          total = this._connectionService.web3.utils.fromWei(total, "ether");
          /* console.log(total); */
          const dialogRef = this.dialog.open(DonateDialogComponent, {
            data: {
              amount: amount,
              project: this.myProject[i],
              charity: charity,
              total: total
            },
          });
        });
    }
  }

  setProject(project: string, i : number){
    this.myProject[i] = project;
  }

  showTotal(charity, project, i){
    let total;
      this._connectionService.charityETH.methods.getDonations(charity, this.myProject[i]).call({from: this._connectionService.access})
        .then((tot) => {
          total = tot;
          total = this._connectionService.web3.utils.fromWei(total, "ether");
          console.log(total);
          let str = "This project has received " + total + " ETH to date";
          let snackBarRef = this.snackBar.open(str, 'GOT IT', {
            duration: 3000
          });
        });
  }
}
