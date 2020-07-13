import React, { Component } from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Request from '../../shared/Request';

export default class Payment extends Component {
    constructor(props) {
        super();
        this.state = {

        }
    }

    validation = () => {
        var isValid = true;
        this.fields.forEach(field => {
            var value = this.state[field.toLowerCase().replace(/[^A-Z0-9]/ig, '')]
            if (value === undefined || value === '')
                isValid = false;
        })
        return isValid;
    }

    handleChange = key => event => {
        this.setState({ [key]: event.target.value }, () => {
            this.props.validationHandler(this.validation())
        })
    }

    fields = ['Card number', 'Name on card', 'Expiry month', 'Expiry year', 'Security code'];

    showErr = () => {
        if (this.props.showerr) {
            return 'All fields are mandatory';
        }
        if (this.props.showstuberror)
            return 'Payment Failed - Please check your Payment Details';
        return '';
    }
    processPayment = () => {
        Request.post(`/api/payment/creditService/creditCardTransactions`, {
            amount: 2,
            credit_card: {
                cardNumber: `${this.state.cardnumber}`,
                cvv: `${this.state.securitycode}`,
                expiration_month: `${this.state.expirymonth}`,
                expiration_year: `${this.state.expiryyear}`
            },
            billing_address: {
                name: `${this.state.nameoncard}`,
                street_address: "8320 E. West St.",
                city: "Spokane",
                state: "WA",
                zip: "85284"
            }
        })
            .then(res => {
                this.props.paymentHandler(true)
            })
            .catch(error => {
                this.props.paymentHandler(false)
            });
    }

    render() {
        return (
            <Box align='center'>
                <Typography variant='body1'>
                    Payment details
                </Typography>
                <Grid container justify="center" spacing={0}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}>
                        <form noValidate autoComplete="off" >
                            {this.fields.map((text, index) => (
                                <TextField
                                    key={index}
                                    id={`${text.toLowerCase().replace(/[^A-Z0-9]/ig, '')}`}
                                    label={text}
                                    margin="normal"
                                    onChange={this.handleChange(`${text.toLowerCase().replace(/[^A-Z0-9]/ig, '')}`)}
                                    value={this.state[text.toLowerCase().replace(/[^A-Z0-9]/ig, '')] || ''}
                                    required
                                    fullWidth
                                />
                            ))}
                        </form>
                        <br />
                        <Typography variant="caption" align="center" color="secondary">
                            {this.showErr()}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}