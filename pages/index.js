import React,{Component} from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';
import { Button, Icon, Label } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

// export default()=>{
//   return <h1>show new</h1>
// }
//首页要做的操作是查看众筹工厂里面每一个众筹实例 所以需要一个好看的页面
// cnpm install --save semantic-ui-react
//https://react.semantic-ui.com

class Compainindex extends Component{

  //props属性是Component内置的属性


  //让这段代码执行
  static async getInitialProps(){
    const campaign = await factory.methods.getDeployedCampaign().call();
    return {campaign};
  }
  renderCampaign(){
    const items = this.props.campaign.map(address=>{
      return {
        header: address,
        description: <Link route ={`/compaigns/${address}`}><a>查看众筹</a></Link>,
        //边框动态长度
        fluid:true
      }
    });

    return  <Card.Group items={items} />;
  }


    // async componentDidMount(){
    //   //获取所有的众筹合约
    //   const campaign = factory.methods.getDeployedCampaign().call();
    //   //没找到getDeployedCampaign 就去remix浏览器试一下
    //   // const compain = factory.options.address;
    //   console.log(compain);
    // }
  render(){
    // return <div>hello {this.props.campaign[0]}</div>;
    return (
      <Layout>
      <div>
      <h3>众筹列表</h3>
      <Link route ="/compaigns/new">
      <a>
        <Button floated='right' content='创建众筹' icon='add circle' labelPosition='left' primary />
        </a>
        </Link>

        {this.renderCampaign()}
      </div>
      </Layout>

    );
  }
}

export default Compainindex;
