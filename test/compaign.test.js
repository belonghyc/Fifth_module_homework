const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compileFactory = require('../ethereum/build/CampaignFactory.json');
const compileCampaign = require('../ethereum/build/Campaign.json');

//定义全局变量是因为beforeEach里面的元素首先要在全局被发现
var accounts;
var campainAddress;
var campaign;
var factory;

beforeEach(async()=>{
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
  .send({from:accounts[0],gas:'1000000'});

  //通过合约工厂创建合约
  await factory.methods.createCampain('100').send({from:accounts[0],gas:'1000000'});

  //也可以得到合约 用一个数组存储 [数组] 相当于是把数组的第0号元素取出来
  //factory.methods.getDeployedCampaign() 是数组，0号元素赋值给了campainAddress
  //不需要消耗gas的函数需要这后方添加call()
  [campainAddress] =await factory.methods.getDeployedCampaign().call();

  campaign = await new web3.eth.Contract(JSON.parse(compileCampaign.interface),campainAddress);

})
//部署合约
describe('campaign',()=>{

  //验证部署是否成功
  it('deploy a factory and campaign',()=>{
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })
  //验证管理者是否为合约工厂的第0号地址
  it('manager address',async()=>{
    const manager = await campaign.methods.manager().call();
    assert(manager,accounts[0]);
  })
  //
  it('allow people to contribute',async()=>{
    //做contribute操作
      await campaign.methods.contribute().send({
        from:accounts[1],
        value:'200'
      });
    })
  it('require a mininum contribute',async()=>{
    //添加try catch操作  assert(err)y有值 说明捕获异常成功
    try {
      await campaign.methods.contribute().send({
        from:accounts[1],
        value:'5'
      });

        const isContribute = await campaign.methods.approvers(accounts[1]).call();
        assert(isContribute);
    } catch (err) {
      assert(err)
    }

  })

  it('allow a manager to make request',async()=>{
    //创建一个请求 参数为请求名，消耗的gas，转入的账户
    await campaign.methods.createRequest('buy pig','100',accounts[1]).send({
      from:accounts[0],
      gas:'1000000'
    });
    //获取第一个请求
    const request = await campaign.methods.requests(0).call();
    assert.equal('buy pig',request.description);


  })


})
