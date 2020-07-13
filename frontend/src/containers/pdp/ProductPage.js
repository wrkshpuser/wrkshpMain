import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import './ProductPage.css'
import Divider from '@material-ui/core/Divider';
import Aux from '../../hoc/ReactAux';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import store from 'store';
import { IMGBASEURL } from '../../shared/Statik';
import Request from '../../shared/Request';

export default class ProductPage extends Component {
    constructor(props) {
        super();
        this.state = {
            productdata: {},
            quantity: 0,
            gyears: Math.floor(Math.random() * 5) + 1,
            randomdays: Math.floor(Math.random() * 14) + 1,
            randomreviews: Math.floor(Math.random() * 50000) + 1,
            code: ''
        }
    }

    componentDidMount = () => {
        Request.get(`/api/catalogue-rest/product/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ productdata: res.data });
            })
            .catch(error => {
                console.log('Error ' + error)
            });
    }

    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    dateRandom = () => {
        var today = new Date();
        var newdate = new Date();
        var randomnum = this.state.randomdays;
        newdate.setDate(today.getDate() + randomnum);
        return 'Get it delivered by ' + this.monthNames[newdate.getMonth()] + ' ' + newdate.getDate();
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    addToBasket = () => {
        if (store.get(this.state.productdata.productCode) === undefined) {
            store.set(this.state.productdata.productCode, this.state.quantity)
        } else {
            store.set(this.state.productdata.productCode, parseInt(store.get(this.state.productdata.productCode)) + parseInt(this.state.quantity))
        }
        this.setState({ code: this.state.productdata.productCode})
        var data = JSON.parse(store.get('items'));
        if (!data.includes(this.state.productdata.productCode))
            data.push(this.state.productdata.productCode)
        store.set('items', JSON.stringify(data))
    }

    render() {
        return (
            <Aux>
                <Header code={this.state.code} />
                <Card className='productpage'>
                    <CardMedia
                        className='productimg'
                        image={(this.state.productdata.productImage === undefined) ? 'https://place-hold.it/300x500' : IMGBASEURL + `${this.state.productdata.productImage}`}
                        title="Image"
                    />
                    <div className='details'>
                        <CardContent className='producttitle'>
                            <Typography component="h4" variant="h4">
                                {this.state.productdata.productName}
                            </Typography>
                            <br />
                            <Typography variant="h5" className='productprice'>
                                £{this.state.productdata.productPrice}
                            </Typography>
                            <Typography variant="body1" className='productreviews'>
                                {this.state.gyears} year guarantee included
                    </Typography>
                            <br />
                            <StarRatings
                                rating={this.state.gyears}
                                starDimension="25px"
                                starSpacing="1px"
                                starRatedColor='#ff9f43'
                            />
                            <Typography variant="body1" display="block" className='reviews' >
                                ({this.state.randomreviews} Ratings &amp; {this.state.randomreviews} Reviews)
                    </Typography>
                            <Typography variant="body1" className='productdelivery' >
                                FREE Standard Delivery by E-Shop
                    </Typography>
                            <Typography variant="body1" className='delivery' >
                                {this.dateRandom()}
                            </Typography>
                            <Divider className='divider' />
                            <Typography variant="h5">
                                Product Description
                    </Typography>
                            <Typography variant="body1" className='productdelivery' >
                                {this.state.productdata.productDescription}
                            </Typography>
                            <Divider className='divider' />
                            <Typography variant="h5">
                                Quantity
                    </Typography>
                            <FormControl >
                                <InputLabel htmlFor="product-quantity"></InputLabel>
                                <Select
                                    native
                                    value={this.state.quantity}
                                    onChange={this.handleChange('quantity')}
                                    inputProps={{
                                        name: 'quantity',
                                        id: 'product-quantity',
                                    }}
                                >
                                    {new Array(9).fill().map((_, i) => (
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <Divider className='divider' />
                            <Typography variant="body1" align='center'>
                                {this.state.productdata.productQuantity === (undefined || 0) ? `Currently out of stock` : `Currently in stock`}
                            </Typography>
                            <br />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={this.addToBasket}
                                disabled={this.state.productdata.productQuantity === (undefined || 0)}
                            >
                                Add to your basket
                        </Button>
                            <br />
                            <br />
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                color="default"
                            >
                                Add to wishlist
                        </Button>
                            <Divider className='divider' />
                        </CardContent>
                    </div>
                </Card>
                <Footer />
            </Aux>
        );
    }
}