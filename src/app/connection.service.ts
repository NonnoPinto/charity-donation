import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { contract_address, charity_abi } from "src/abis.js";
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private router: Router) {  }

  web3: Web3 = new Web3(Web3.givenProvider);
  charityETH = new this.web3.eth.Contract(charity_abi, contract_address);
  //contract owner
  private owner: String = "0xD02B022cC003f8E0ddE5121944214528bB072d28";
  //indirizzo
  access: any;

  getOwner(): String{
    return this.owner;
  }
}
