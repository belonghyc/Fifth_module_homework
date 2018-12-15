import React from 'react';
import Campaign from '../../ethereum/campaign';
import Layout from '../../components/Layout';
import { Card,Button,Grid } from 'semantic-ui-react';
import ContributeForm from '../../components/contributeForm';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes'
class CampaignShow extends React.Component{

  static async getInitialProps(props){

    // console.log(props.query.address);
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    // console.log(summary);
    ////用于换行 style:{overflowWrap:'break-word'}
    return {
        address:props.query.address,
        minimunContribute:summary[0],
        balance:summary[1],
        requestcount:summary[2],
        approversCount:summary[3],
        manager:summary[4]

    };
  }
  renderCard(){
    const {
      address,
      minimunContribute,
      balance,
      requestcount,
      approversCount,
      manager
    }=this.props;
    const items =[
      {
          header:manager,
          meta:'管理者地址',
          description:'当前管理者创建了众筹列表，并且是众筹的受益人',
          style:{overflowWrap:'break-word'}
      },
      {
          header:minimunContribute,
          meta:'最小贡献量',
          description:'如果你想对此众筹进行投资，你就需要至少大于当前的金额',
          style:{overflowWrap:'break-word'}
      },
      {
          header:requestcount,
          meta:'总的请求的数量',
          description:'当前管理者创建请求从合约中提钱，必须要大于50%的投资人同意',
          style:{overflowWrap:'break-word'}
      },
      {
          header:approversCount,
          meta:'投资人的数量',
          description:'已经为当前众筹投资的投资人的数量',
          style:{overflowWrap:'break-word'}
      },
      {
          header:web3.utils.fromWei(balance,'ether'),
          meta:'众筹总的金额',
          description:'当前众筹中，还剩下多少的金额。',
          style:{overflowWrap:'break-word'}
      }
    ];
    return <Card.Group items={items} />;
  }

  render(){
    //props属性是Component内置的属性 可以用于导出summary
    const summary = this.props.summary;
    //ABI会将同名的值赋值到对象中
    // const {
    //   address,
    //   minimunContribute,
    //   balance,
    //   requestcount,
    //   approversCount,
    //   manager
    // }=this.props;
    // console.log(address);
    // console.log(minimunContribute);
    // console.log(balance);
    // console.log(manager);
    //reactui响应式布局
    return(
      <Layout>
     <h1>众筹显示</h1>
        <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
              {this.renderCard()}

           </Grid.Column>
           <Grid.Column width={6}>
              <ContributeForm address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={10}>
                <Link route ={`/compaigns/${this.props.address}/requests`}>
                  <a>
                  <Button primary>查看请求</Button>
                  </a>
                </Link>
              </Grid.Column>
          </Grid.Row>

        </Grid>


    </Layout>
    )
  }

}

export default CampaignShow;
