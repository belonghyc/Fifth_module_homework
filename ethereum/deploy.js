const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
//const {interface,bytecode} =require('./compile');
//改为导入合约工厂
const complieFactory = require('./build/CampaignFactory.json');
const provider = new HDWalletProvider(
  'segment illness depth property blouse armor wild twice bench offer all bubble',//进去metamask找到我们的助记词
  'https://ropsten.infura.io/v3/cf73fcc86edf41f8a57c9b8cb1849d31' //想要部署在哪个网络就复制哪个网址过来
)//通过以上两个参数把infura和服务连接在一起

const web3 =new  Web3(provider);//构建这个web3中

const deploy = async ()=>{
  // console.log(interface);
  const accounts = await web3.eth.getAccounts(); //从web3中获取账户的信息  web3的库函数都是异步的
  //console.log('Attemp tp deploy contract',account[0]);
  //我的0号账户 0x3d3748769020b47496Cb8764AED244128F2dB681  与控制台打印的一模一样
  //为了后续把合约导入到ropsten或者说主网里面去

  //1.11部署博彩合约的时候构造器没有参数，所以把【,arguments:['belonghyc'] 】去掉
  const result = await new web3.eth.Contract(JSON.parse(complieFactory.interface)).deploy({data:'0x'+complieFactory.bytecode}) //合约里面都字符串没有 0x 所以要这前面添加0x
                .send({from:accounts[0],gas:'1000000'});
  console.log('contract deploy to',result.options.address);

  // 0xC1090a4Cf32cf73c61B2988eb55dEb2E4382D1BA  https://ropsten.etherscan.io  部署到ropsten网络里面  输入合约的地址
}
//调用deploy;
deploy();
//cnpm install --save next react react-dom
//这next路由得时候安装这三个包
//安装之后会新增一个.next的隐藏文件 处理逻辑，同时我们要新建一个pages文件夹存储React components到页面中显示
//相当于找页面名称
