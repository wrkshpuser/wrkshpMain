import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import DeliveryAddress from '../../components/deliveryaddress/DeliveryAddress';
import Payment from '../../components/payment/Payment';
import Confirmation from '../../components/confirmation/Confirmation';
import Aux from '../../hoc/ReactAux';
import isLoggedIn from '../../helpers/LoggedIn';
import store from 'store';
import './Checkout.css';

export default class Checkout extends Component {
    constructor(props) {
        super();
        this.pay = React.createRef();
        this.state = {
            activeStep: 0,
            daisvalid: false,
            showdaerror: false,
            paymentisvalid: false,
            showpaymenterr: false,
            paymentsuccess: false,
            showstuberr: false,

        }
    }

    steps = () => {
        return ['Delivery', 'Review & pay', 'Complete']
    }

    handleNext = () => {
        if (this.state.activeStep === 0) {
            if (!this.state.daisvalid) {
                this.setState({ showdaerror: true })
                return;
            } else {
                this.setState(prevState => { return { activeStep: prevState.activeStep + 1 } })
            }
        }
        if (this.state.activeStep === 1) {
            if (!this.state.paymentisvalid) {
                this.setState({ showpaymenterr: true })
                return;
            } else
                this.pay.current.processPayment();
        }

    }

    componentDidMount = () => {
        var count = store.get('items') === undefined ? 0 : JSON.parse(store.get('items')).length;
        if (count === 0)
            this.props.history.push('/')
        if (!isLoggedIn()) {
            this.props.history.push('/login')
        }

    }

    handleBack = () => {
        this.setState(prevState => { return { activeStep: prevState.activeStep - 1 } })
    }

    deliveryAddrValid = (isvalid) => {
        this.setState({ daisvalid: isvalid, showdaerror: false })
    }

    paymentValid = (isvalid) => {
        this.setState({ paymentisvalid: isvalid, showpaymenterr: false })
    }

    paymentIsSuccess = (isvalid) => {
        if (isvalid) {
            store.each((value, key) => {
                if (!(key === 'loggedIn' || key === 'userName' || key === 'email'))
                    store.remove(key);
            });
            this.setState(prevState => { return { activeStep: prevState.activeStep + 1 } })
        } else {
            this.setState({ showstuberr: true })
            return;
        }
    }

    stepContent = (index) => {
        switch (index) {
            case 0:
                return <DeliveryAddress validationHandler={this.deliveryAddrValid} showerr={this.state.showdaerror} />
            case 1:
                return <Payment validationHandler={this.paymentValid} paymentHandler={this.paymentIsSuccess} showerr={this.state.showpaymenterr} showstuberror={this.state.showstuberr} ref={this.pay} />
            case 2:
            default:
                return <Confirmation />

        }
    }

    showButton = () => this.state.activeStep === 0 || this.state.activeStep === 1

    render() {
        return (
            <Box>
                <Header />
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.steps().map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box>
                    {this.stepContent(this.state.activeStep)}
                    <Grid container justify="center" spacing={0}>
                        <Grid
                            className='buttonscontainer'
                            item
                            xs={12}
                            sm={6}
                            md={4}>
                            {this.showButton() && (<Aux>
                                <Button
                                    className='buttons'
                                    variant="contained"
                                    color="secondary"
                                    id="backbutton"
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                >
                                    Back
                           </Button>
                                <Button className='buttons' variant="contained" color="secondary" onClick={this.handleNext} id={this.state.activeStep === this.steps().length - 2 ? "buttonconfirm" : "buttonnext"}>
                                    {this.state.activeStep === this.steps().length - 2 ? 'Confirm' : 'Next'}
                                </Button></Aux>)
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Footer />
            </Box>
        );
    }
}