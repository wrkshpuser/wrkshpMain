import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default class DeliveryAddress extends Component {
    constructor(props) {
        super();
        this.state = {
            activeStep: 0,

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

    fields = ['Title', 'First name', 'Last name', 'Address line1', 'Address line2', 'City', 'State/Province/Region', 'ZIP/Postcode'];

    showErr = () =>{
        if(this.props.showerr){
            return 'All fields are mandatory';
        }
        return '';
    }

    render() {
        return (
            <Box align='center'>
                <Typography variant='body1'>
                    Where is this being delivered?
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
                                    id={`da${text.toLowerCase().replace(/[^A-Z0-9]/ig, '')}`}
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