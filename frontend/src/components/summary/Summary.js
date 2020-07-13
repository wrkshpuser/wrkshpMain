import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Done from '@material-ui/icons/Done';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import './Summary.css'

export default class BasketItem extends Component {
    constructor(props) {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Box className='box'>
                <Typography variant='h6'>
                    Summary
                </Typography>
                <br />
                <Typography variant='body1'>
                    Your order qualifies for:
                </Typography>
                <Typography variant='body2' className='delivery'>
                    <Done className='doneicon' /> FREE standard delivery
                </Typography>
                <Typography variant='body2' className='checkout'>
                    More delivery options at checkout
                </Typography>
                <Divider light={true} variant='middle' />
                <br />
                <Typography variant='h6' color='primary'>
                    Subtotal ({this.props.count}): <span >£{this.props.price}</span>
                </Typography>
                <br />
                <NavLink id='proceedtocheckout' to='/checkout' exact className='linkstyle'>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="secondary"
                    >
                        Proceed to checkout
                        </Button>
                </NavLink>
            </Box>
        )
    }
}