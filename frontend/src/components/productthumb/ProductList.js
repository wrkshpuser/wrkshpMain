import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import {NavLink} from 'react-router-dom';
import { IMGBASEURL } from '../../shared/Statik';
import './ProductList.css'

export default class ProductList extends Component {

    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    dateRandom = () => {
        var today = new Date();
        var newdate = new Date();
        var randomnum = Math.floor(Math.random() * 14) + 1;
        newdate.setDate(today.getDate() + randomnum);
        return 'Get it delivered by ' + this.monthNames[newdate.getMonth()] + ' ' + newdate.getDate();
    }

    render() {
        return (
            <Card className='productlistthumb'>
                <CardMedia
                    className='listimg'
                    image={(this.props.data.productImage === undefined) ? 'https://place-hold.it/300x500' : IMGBASEURL + `${this.props.data.productImage}`}
                    title="Image"
                />
                <div className='productlistdetails'>
                    <CardContent className='productlisttitle'>
                        <Typography component="h6" variant="h6">
                            <NavLink to={`/product/${this.props.data.productCode}`} exact className='linkstyle'>
                                {this.props.data.productName}
                            </NavLink>
                        </Typography>
                        <Typography variant="h6" className='listprice'>
                            £{this.props.data.productPrice}
                        </Typography>
                        <StarRatings
                            rating={Math.floor(Math.random() * 5) + 1}
                            starDimension="20px"
                            starSpacing="1px"
                            starRatedColor='#ff9f43'
                        />
                        <Typography variant="caption" display="block" className='reviews' >
                            ({Math.floor(Math.random() * 50000) + 1} Ratings &amp; {Math.floor(Math.random() * 50000) + 1} Reviews)
                    </Typography>
                        <Typography variant="body1" className='delivery' >
                            FREE Delivery by E-Shop
                    </Typography>
                        <Typography variant="body1" className='delivery' >
                            {this.dateRandom()}
                        </Typography>
                    </CardContent>

                </div>
            </Card>
        );
    }
}