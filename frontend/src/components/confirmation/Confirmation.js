import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Icon from '@material-ui/core/Icon'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './Confirmation.css'
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import store from 'store';

export default class Confirmation extends Component {
    constructor(props) {
        super();
        this.state = {

        }

    }

    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    deliveryDate = () => {
        var today = new Date();
        var newdate = new Date();
        newdate.setDate(today.getDate() + 5);
        return this.monthNames[newdate.getMonth()] + ' ' + newdate.getDate()+'th';
    }

    steps = () => {
        return ['Payment Confirmed', 'Order Received', 'Packing your Order', 'On its way to you']
    }

    render() {
        return (
            <Box align='center'>
                <Icon color='primary' fontSize='large' className='tickicon'>
                    done_outline
                </Icon>
                <Typography variant='h4' color='primary' style={{ marginBottom: '10px' }}>
                    Thanks for your order!
                </Typography>
                <Typography variant='body1' style={{ marginBottom: '10px' }}>
                    Your order id: <strong>ESHOP{Math.floor(Math.random() * (1000000 - 100001 + 1) + 100001)}</strong>
                </Typography>
                <Typography variant='body2' style={{ marginBottom: '20px' }}>
                    We've sent a confirmation email to <strong>{store.get('email')}</strong>
                </Typography>
                <Typography variant='body1' style={{ marginBottom: '20px' }}>
                    You'll be notified as soon as there is an update on your order
                </Typography>

                <Grid container justify="center" spacing={0}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}>
                        <Divider variant='middle' />
                        <br />
                        <Typography variant='body1'>
                            Estimated delivery date
                        </Typography>
                        <Typography variant='h6' color='primary'>
                            {this.deliveryDate()}
                        </Typography>
                        <Box className='stepper'>
                            <Stepper activeStep={2} orientation="vertical">
                                {this.steps().map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Divider variant='middle' />
                        <br/>
                        <Typography variant='body1'>
                            Do you want to place another order? <Link href='/products/all'>Place another order</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}