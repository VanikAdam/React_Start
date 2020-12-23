
import React, { Component } from "react";
class Price extends Component {
    constructor(props) {
        super(props);
        this.state={
            price:props.price,
            currentCurrency:'AMD',
            currency:'USD',
            rate:500
        };
        
        
        
        
    }
    changeCurrency=()=>{
        let currency, price, currentCurrency;
       if(this.state.currency==='USD'){
           currency='AMD';
           currentCurrency='USD'
            price=this.state.price/this.state.rate
          
       }
       else{
         currency='USD';
         currentCurrency='AMD'
         price=this.state.price*this.state.rate
       }
       this.setState({
            currency,
            price, currentCurrency
        });
    }

render(){
    let{price,currency, currentCurrency}=this.state
    return (
        <div>
            <p>{price} {currentCurrency} </p>
            <button onClick={this.changeCurrency}>Show in {currency}</button>
        </div>
    )
}
}
export default Price;