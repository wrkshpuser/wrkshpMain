import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import ProductList from '../../components/productthumb/ProductList';
import Department from '../../components/sidebar/Department';
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import './ProductListWidget.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Request from '../../shared/Request';
import { Divider } from '@material-ui/core';
import Search from '../../components/search/Search';
import NoItems from '../../components/noitems/NoItems';
import overlayLoading from '../../images/Loading_icon.gif';

class ProductListWidget extends Component {

    constructor(props) {
        super();
        this.state = {
            products: null,
            query: ''
        }
    }

    componentDidMount = () => {
        this.setState({ query: this.props.match.params.id });
        this.renderProducts(this.props.match.params.id);
    }

    renderProducts = (query) => {
        this.setState({ products: null});
        var suffix = (query === 'all' || query === '') ? '/all' : '/search?productName=' + query;
        Request.get(`/api/catalogue-rest/product${suffix}`)
            .then(res => {
                this.setState({ products: res.data });
            })
            .catch(error => {
                console.log('Error ' + error)
            });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps === undefined)
            return false;
        if (this.state.query !== this.props.match.params.id) {
            this.setState({ query: this.props.match.params.id });
            this.renderProducts(this.props.match.params.id)
        }
    }

    render() {
        return (
            <Aux>
                <Header />
                <Search history={this.props.history} />
                <Divider variant='middle' />
                {this.state.products === null ?
                    <img src={overlayLoading} alt="loading..." /> :
                    this.state.products.length === 0 ? <NoItems basket={false} term={this.state.query}/> :
                        <Grid container justify="center" spacing={0}>
                            <Hidden only={['sm', 'xs', 'md']}>
                                <Grid item lg={3} xl={3}>
                                    <Department />
                                </Grid>
                            </Hidden>
                            <Grid item lg={9} xl={9} >
                                {this.state.products.map((data, index) => (
                                    <Aux key={index}>
                                        <ProductList data={data} key={index} />
                                        <Divider light={true} variant='middle' />
                                    </Aux>
                                ))}
                            </Grid>
                        </Grid>
                    }
                <Footer />

            </Aux>
        );
    }
}
export default ProductListWidget;