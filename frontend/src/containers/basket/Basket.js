import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import BasketItem from '../../components/basketitem/BasketItem';
import Divider from '@material-ui/core/Divider';
import Aux from '../../hoc/ReactAux';
import './Basket.css'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import store from 'store';
import Request from '../../shared/Request';
import Summary from '../../components/summary/Summary'
import NoItems from '../../components/noitems/NoItems';

export default class Basket extends Component {
    constructor(props) {
        super();
        this.state = {
            products: [],
            totalprice: 0,
            totalitems: ''
        }
    }

    componentDidMount = () => {
        var items = JSON.parse(store.get('items'));
        items.forEach(code => {
            Request.get(`/api/catalogue-rest/product/${code}`)
                .then(res => {
                    this.setState({ products: [...this.state.products, res.data] });
                    this.setState(prevState => { return { totalprice: prevState.totalprice + (res.data.productPrice * parseInt(store.get(res.data.productCode))) } })
                })
                .catch(error => {
                    console.log('Error ' + error)
                });
        });
        this.setState({ totalitems: items.length <= 2 ? items.length + ' item' : items.length + ' items' })
    }

    render() {
        return (
            <Aux>
                <Header />
                <br />
                <Typography variant='h4' align='center' color='primary'>Basket</Typography>
                <Divider light={true} variant='middle' />
                {this.state.products.length !== 0 ?
                    (<Grid container
                        direction="row">
                        <Grid item md={9}  >
                            {this.state.products.map((data, index) => (
                                <Aux key={index}>
                                    <BasketItem data={data} />
                                    <Divider light={true} variant='middle' />
                                </Aux>
                            ))}
                        </Grid>
                        <Grid item md={3} className='summarywidth' >
                            <Summary count={this.state.totalitems} price={this.state.totalprice} />
                        </Grid>
                    </Grid>) :
                    (<NoItems basket={true} />)}
                <Footer />
            </Aux>
        );
    }
}