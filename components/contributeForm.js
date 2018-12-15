import React,{Component} from 'react';

import {Form,Input,Button,Message} from 'semantic-ui-react';
import { Router } from '../routes';

//需要通过合约地址导入合约
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {

  state ={
    value:'',
    loading:false,
    errorMessage:''

  }

  onSubmit = async()=>{
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    this.setState({loading:true});
    try {
      await campaign.methods.contribute().send({
        from:accounts[0],
        value:web3.utils.toWei(this.state.value,'ether')
      })
      Router.replace(`/compaigns/${this.props.address}`);
    } catch (error) {
      this.setState({errorMessage:error.message});
    }
    this.setState({loading:false});

  }

  render(){

    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
            <label>总的投资额度</label>
            <Input
            value = {this.state.value}
            onChange={event=>this.setState({value:event.target.value})}
              label ="ethei"
              labelPosition="right"
              />
          </Form.Field>
          <Message error header ="错误提示" content = {this.state.errorMessage} />
          <Button loading={this.state.loading} primary >投资 </Button>
      </Form>
    );

  }

}
export default ContributeForm;
