import { Component } from "@stencil/core";

@Component({
    tag: 'nk-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        console.log('Submit!!!');
    }

    render() {
        return [
            <form onSubmit={this.onFetchStockPrice}>
                <input id="stock-symbol" />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: {0}</p>
            </div>
        ];
    }
}