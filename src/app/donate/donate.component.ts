import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { forkJoin, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DonateDialogComponent } from '../donate-dialog/donate-dialog.component';
import { ErrorComponent } from '../error/error.component';
import { compileFactoryFunction } from '@angular/compiler';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  constructor(private _connectionService: ConnectionService, public dialog: MatDialog) { }

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
    if(!amount || !this.myProject[i] || !charity){
      const dialogRef = this.dialog.open(ErrorComponent, {
        data: {
          error: "Something went wrong, maybe you didnt chose the project, try again!",
        },
      });
    }
    /* Magari un giorno la implemento, intanto se ne occupa metamask */
    /* else if(amount>myAmount){
      const dialogRef = this.dialog.open(ErrorComponent, {
        data: {
          error: "You don't have enogh ETH!",
        },
      });
    } */
    else{
      const dialogRef = this.dialog.open(DonateDialogComponent, {
        data: {
          amount: amount,
          project: this.myProject[i],
          charity: charity
        },
      });
    }
  }

  setProject(project: string, i : number){
    this.myProject[i] = project;
  }
}
