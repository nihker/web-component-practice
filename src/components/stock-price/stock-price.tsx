import { Component } from "@stencil/core";

@Component({
    tag: 'nk-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {

    render() {
        return [
            <form>
                <input id="stock-symbol" />
                <button type="submit">Fetch</button>
            </form>,
            <div>
                <p>Price: {0}</p>
            </div>
        ];
    }
}