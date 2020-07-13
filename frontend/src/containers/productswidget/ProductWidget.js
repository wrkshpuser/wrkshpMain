import React from 'react';
import Grid from "@material-ui/core/Grid";
import SmallThumb from '../../components/productthumb/SmallThumb';
import Typography from '@material-ui/core/Typography';
import './ProductWidget.css';

function ProductWidget(props) {

    function getTitle(index){
        var text = '';
        if(index === 0){
            text = 'Top Sellers';
        }else if(index === 1){
            text = 'Recently Viewed';
        }else{
            text = 'Top New'
        }
        return text;
    }

    return (
        <Grid container
            direction="row">
                {[props.data.slice(0,5), props.data.slice(5,10), props.data.slice(10,15)].map((dataslice,index)=>(
                    <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                >
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <Typography className='widgettitle' color='primary'>
                            {getTitle(index)}
                    </Typography>
                        {dataslice.map((data, index) => (
                            <SmallThumb data={data} key={index} />
                        ))}
                    </Grid>
                </Grid>
                ))}
        </Grid>
    );
}
export default ProductWidget;