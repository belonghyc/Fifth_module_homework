import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  //应该导入合约的地址而不是交易的hash
  // '0xec35f8aa3ae967319cbe0b6bf7d511c89455dcb80056b8dd04c9329379c81d5c'
  '0xB1ECAeC3f867b2Ad2106Fe2FB45deCdb1a2A91ab'
)

export default instance;
