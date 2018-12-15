import React,{Component} from 'react'
import Layout from '../../components/Layout';
import { Button, Form,Input } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Router } from '../../routes';


//方便跳转 安装一个包 cnpm install --save next-routes
//next增强的一个包
class CampaignNew extends Component{
  //*添加onChange事件就能在修改Input的value的时候修改state的值*/
  state = {
    mininum:'',
    errMessage:'',
    loading:'',

  }
  onSubmit = async()=>{
    this.setState({errMessage:''});
    this.setState({loading:true});
    try {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampain(this.state.mininum).send({from:accounts[0]});

      Router.pushRoute('/');
    } catch (err) {
      this.setState({errMessage:err.message});
    }
    this.setState({loading:false});

  }

  render(){

    console.log(this.state.mininum);

    return (
      <Layout>
    <h3>创建你的众筹项目</h3>
    <Form onSubmit ={this.onSubmit} error = {!!this.state.errMessage} >
      <Form.Field>
        <label>请输入最小的贡献量</label>
        <Input  label="wei" labelPosition="right"
          value ={this.state.mininum}
          onChange={event=>this.setState({mininum:event.target.value})}
        />

      </Form.Field>
      <Message   error header="错误" content={this.state.errMessage}/>
      <Button loading={this.state.loading}  primary>创建众筹</Button>
    </Form>
    </Layout>
    )
  }




}

export default CampaignNew;
