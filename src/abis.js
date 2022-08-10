export const contract_address = '0xa0ca16511d03fa7bd5df4faedbe92a164437cbc4';
export const charity_abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_charity",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_charityAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_project",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_projectAddr",
				"type": "address"
			}
		],
		"name": "addCharity",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_project",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_projectAddr",
				"type": "address"
			}
		],
		"name": "addProject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_charity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_project",
				"type": "string"
			}
		],
		"name": "donate",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "findCharity",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllCharities",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_charity",
				"type": "string"
			}
		],
		"name": "getAllProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "totalDonation",
						"type": "uint256"
					}
				],
				"internalType": "struct Charity.project[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_charity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_project",
				"type": "string"
			}
		],
		"name": "getDonations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
