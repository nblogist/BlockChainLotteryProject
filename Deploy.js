const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile.js');
const provider = new HDWalletProvider {
    'issue planet wonder jealous emerge fabric purse rely tonight unhappy fold elevator',
    'https://rinkeby.infura.io/v3/18c25be0ecce41fd81fcb320101aaca9'
}

const web3 = new Web3(provider);

const depoly = async => {
    const accounts = await web3.eth.getAccounts();
    const data = await new web3.eth.Contract (JASON.parse(interface))
                    .deploy({data :'0x' + bytecode})
                    .send ({from: accounts[0], gas: 1000000});
    console.log('Deployed to ', data.options.address);
};

deploy();