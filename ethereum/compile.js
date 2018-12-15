//把编译好的文件放到build下面

const path = require('path');
const solc = require('solc');

const fs = require('fs-extra');

const buildpath = path.resolve(__dirname,'build');

//如果已经有buildpath就要把它删掉
fs.removeSync(buildpath);

//得到合约的路径
const CampaignPath = path.resolve(__dirname,'contracts','compain.sol');

//读取文件夹下的内容
const source = fs.readFileSync(CampaignPath,'utf8');

//编译
const output =solc.compile(source,1).contracts;

// console.log(output);
//确保路径是存在的
fs.ensureDirSync(buildpath);
//把两个合约都拿到并放在build目录下
//循环遍历内容把它放到json文件当中
for(let contract in output){
  //把这种以json格式传
  fs.outputJsonSync(path.resolve(buildpath,contract.replace(":","") + '.json'),output[contract]);
}
