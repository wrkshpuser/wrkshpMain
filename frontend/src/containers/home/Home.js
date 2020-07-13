import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Header from '../../components/header/Header';
import Slider from '../../components/slider/Slider';
import Feature from '../../components/feature/Feature';
import ProductWidget from '../productswidget/ProductWidget';
import Footer from '../../components/footer/Footer';
import Request from '../../shared/Request';
import Search from '../../components/search/Search';

export default class Home extends Component {

    state = {
        productdata:[]
    }

    componentDidMount = () => {
        Request.get(`/api/catalogue-rest/product/15`)
        .then(res => {
            this.setState({productdata: res.data});
        })
        .catch(error => {
            console.log('Error '+ error)
        });
    }

    render() {
        return (
            <Aux>
                <Header />
                <Search history={this.props.history}/>
                <Slider />
                <Feature />
                <ProductWidget data = {this.state.productdata} />
                <Footer />
            </Aux>
        );
    }
}