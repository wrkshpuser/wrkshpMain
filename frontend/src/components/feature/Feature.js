import React from 'react';
import Icon from '@material-ui/core/Icon';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import './Feature.css';

const features = [
    {
        icon: 'autorenew',
        bgcolor: '#54a0ff',
        label: '30 Days Return'
    },
    {
        icon: 'local_shipping',
        bgcolor: '#ee5253',
        label: 'Free Delivery'
    },
    {
        icon: 'credit_card',
        bgcolor: '#10ac84',
        label: 'Secure Payments'
    },
    {
        icon: 'card_giftcard',
        bgcolor: '#ff9f43',
        label: 'New Products'
    }
]

function Feature() {
    return (
        <Grid container
            spacing={0}
            direction="row"
            justify="center"
            alignItems="center">
            {features.map((feature, index) => (
                <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                >
                    <Box
                        color="white"
                        bgcolor={feature.bgcolor}
                        m={1}
                        p={1}
                        className='feature'
                    >
                        <Icon fontSize="large" className='feaureicon'>{feature.icon}</Icon>
                        <Typography variant="h6">
                            {feature.label}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
export default Feature;