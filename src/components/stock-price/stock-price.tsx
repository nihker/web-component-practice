import { Component, State, Element } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
    tag: 'nk-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {

    @Element()  el: HTMLElement;
    @State() fetchPrice: number;

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        // Work only in new Browsers
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
           return res.json();
        })
        .then( parseRes => {
            // If set PLUS 
            this.fetchPrice = +parseRes['Global Quote']['05. price']
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input id="stock-symbol" />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: ${this.fetchPrice}</p>
            </div>
        ];
    }
}