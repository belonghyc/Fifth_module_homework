import Web3 from 'web3';
//内置window对象不明确，在1-12解决这个问题
var web3;
if(typeof window !='undefined' &&window.web3 !='undefined'){
   web3 = new Web3(window.web3.currentProvider);
}else {
  const provider = new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/cf73fcc86edf41f8a57c9b8cb1849d31'
  );
  web3 = new Web3(provider);
}

export default web3;
