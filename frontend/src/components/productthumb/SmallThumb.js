import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import {NavLink} from 'react-router-dom';
import {IMGBASEURL} from '../../shared/Statik';
import './SmallThumb.css'

export default function SmallThumb(props) {
    const imgpath = IMGBASEURL + props.data.productImage;
    return (
        <Card className='productthumb'>
            <CardMedia
                className='smallimg'
                image={imgpath}
                title="Image"
            />
            <div className='productdetails'>
                <CardContent className='productthumbtitle'>
                    <Typography variant="body1">
                        <NavLink to={`/product/${props.data.productCode}`} exact className='linkstyle'>
                            {props.data.productName}
                        </NavLink>
                    </Typography>
                    <Typography variant="subtitle1" className='price'>
                        £{props.data.productPrice}
                    </Typography>
                    <Typography variant="body1" className='delivery' >
                        FREE Delivery
                    </Typography>
                    <StarRatings
                        rating={Math.floor(Math.random() * 5) + 1}
                        starDimension="20px"
                        starSpacing="1px"
                        starRatedColor='#ff9f43'
                    />
                </CardContent>
            </div>
        </Card>
    );
}