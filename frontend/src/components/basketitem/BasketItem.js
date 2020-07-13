import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import store from 'store';
import Aux from '../../hoc/ReactAux';
import { IMGBASEURL } from '../../shared/Statik';

export default class BasketItem extends Component {
    constructor(props) {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Aux>
                <Card className='productthumb'>
                    <CardMedia
                        className='smallimg'
                        image={(this.props.data.productImage === undefined) ? 'https://place-hold.it/300x500' : IMGBASEURL + `${this.props.data.productImage}`}
                        title="Image"
                    />
                    <div className='productdetails'>
                        <CardContent className='productthumbtitle'>
                            <Typography variant="body1">
                                <NavLink to={`/product/${this.props.data.productCode}`} exact className='linkstyle'>
                                    {this.props.data.productName}
                                </NavLink>
                            </Typography>
                            <Typography variant="subtitle1" className='price'>
                                £{this.props.data.productPrice}
                            </Typography>
                            <Typography variant="body1" className='delivery' >
                                FREE Delivery by E-Shop
                            </Typography>
                            <Typography variant="body1" className='delivery' >
                                Currently in Stock
                            </Typography>
                            <Typography variant="body1">
                                Quantity: {store.get(this.props.data.productCode)}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </Aux>
        )
    }
}