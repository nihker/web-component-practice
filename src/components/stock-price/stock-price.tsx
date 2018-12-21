import { Component, State, Element, Prop } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";

@Component({
    tag: 'nk-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {

    stockInput: HTMLInputElement;
    @Element()  el: HTMLElement;
    @State() fetchPrice: number;
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() error: string;

    @Prop() stockSymbol: string;

    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if(this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        } else {
            this.stockInputValid = false;
        }
    }

    onFetchStockPrice(event: Event) {
        event.preventDefault();
        //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        const stockSymbol = this.stockInput.value;
        this.fetchStockPrice(stockSymbol);
    }

    // LIFECYCLE HOOK'S
    // Load
    componentWillLoad() {
        console.log('Component will load');
        console.log(this.stockSymbol);
        this.fetchPrice = 0;
    }

    componentDidLoad(){
        console.log('Component will Load')
        if(this.stockSymbol) {
            this.fetchStockPrice(this.stockSymbol);
        }
    }

    // Update
    componentWillUpdate() {
        console.log('Component will Update');
    }

    componentDidUpdate() {
        console.log('Component Did Update');
    }

    // Unload
    componentDidUnload() {
        console.log('Component Did Unload');
    }

    fetchStockPrice(stockSymbol: string) {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(res => {
                if(res.status !== 200) {
                    throw new Error('Invalid!');
                }
                return res.json();
            })
            .then( parseRes => {
                if(!parseRes['Global Quote']['05. price']) {
                    throw new Error('Invalid symbol!');
                }
                this.error = null;
                this.fetchPrice = +parseRes['Global Quote']['05. price'];
            })
            .catch(err => {
            this.error = err.message;
            });
    }

    render() {
        let dataContent = <p>Please enter a symbol!</p>;
        if(this.error) {
            dataContent = <p>{this.error}</p>;
        }
        if(this.fetchPrice) {
            dataContent = <p>Price: ${this.fetchPrice}</p>;
        }
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input  
                    id="stock-symbol" 
                    ref={el => this.stockInput = el} 
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)}
                />
                <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
            </form>,
            <div>{dataContent}</div>
        ];
    }
}