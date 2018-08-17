const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface,bytecode} = require('./compile.js');

let accounts;
let lottery;

beforeEach('Deploying To ganache', async ()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({data: '0x' + bytecode})
                .send({from: accounts[0], gas:'1000000'});
    
} );

describe('Test', ()=>{
    
    it('Checking if deployed', ()=>{
        assert.ok(lottery.options.address);
    });

    it('Does Enter Works Properly?', async () =>{
        await lottery.methods.EnterLottery().send({
            from: accounts[0], value: web3.utils.toWei('1','ether')});

        let players =  await lottery.methods.GetPlayers().call(/*{from: accounts[0]}*/ );
        assert.ok(accounts[0]);
        assert.ok(players[0]);
        assert.equal(accounts[0],players[0]);
        assert.equal(1,players.length);
    } );

});
