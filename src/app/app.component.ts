import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ConnectionService } from './connection.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Charity Ethereum Donation';

  constructor(private _connectionService: ConnectionService, private router: Router) { }

  _window: any;
  ethereumButton: any;
  showAccount: any;
  connected: boolean = true;
  access: any;
  tmpAddr: any;

  ngOnInit() {
    /* this.checkConnection(); */
    const handleAccountsChanged = this.handleAccountsChanged.bind(this) as unknown as () => void;
    this._connectionService.web3.eth.getAccounts().then(handleAccountsChanged);
    //verifico se sono già collegato
    this._window = window;
    this._window.ethereum.on('chainChanged', () => this._window.location.reload());
    this._window.ethereum.on('accountsChanged', (_newAccounts: any) => this._window.location.reload());
  }

  ngAfterViewInit(): void {
    //Binding bottoni
    this.ethereumButton = document.querySelector('.connectMetamask');
    //Binding span
    this.showAccount = document.querySelector('.showAccount');
    //event listener per i click sui bottoni
    this.ethereumButton.addEventListener('click', () => {
      this.getAccount();
    });
  }

  async getAccount() {
    //-->Indirizzo<--
    this.access = await this._connectionService.web3.eth.requestAccounts();
    this.connected = false;
    this.access = this.access[0];
    this.showAccount.innerHTML = this.access;
    this._connectionService.access = this.access;
    this.landPerson();
  }

  // Scegli landing page
  async landPerson(){
    await this._connectionService.charityETH.methods.findCharity().call({from: this.access}).then((value) => this.tmpAddr = value);
    /* console.log(tmpAddr); */
    if (this.access == this._connectionService.getOwner()){
      this.tmpAddr = "";
      this.router.navigate(["/owner"]);
      /* console.log("Owner"); */
    }
    else if (this.tmpAddr.length > 0){
      this.router.navigate(["/admin"]);
      /* console.log("Admin"); */
    }
    else{
      this.tmpAddr = "";
      this.router.navigate(["/donate"]);
      /* console.log("Utente"); */
    }
  }

  // Se passo da un account collegato ad uno non collegato
  // questa funzione non se ne accorge
  async handleAccountsChanged(accounts: string | any[]) {
    let currentAccount = null;
    //console.log(accounts);

    //se non sono collegato, mostro il pulsante di login
    if (accounts.length === 0) {
      //console.log("Non sei connesso");
      this.connected = true;
      this.router.navigate(['/']);
    }
    //altrimenti carico l'indirizzo
    else {
      currentAccount = accounts[0];
      //console.log("Sei connesso");
      this.connected = false;
      //console.log(this.connected);
      this.access = await this._connectionService.web3.eth.requestAccounts();
      this.access = this.access[0];
      this.showAccount.innerHTML = this.access;
      this._connectionService.access = this.access;
      this.landPerson();
    }
  }
}

