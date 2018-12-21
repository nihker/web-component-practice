import { Component, State, Element, Prop, Watch, Listen } from "@stencil/core";
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
    @State() loading = false;

    @Prop({mutable: true, reflectToAttr: true}) stockSymbol: string;

    @Watch('stockSymbol')
    stockSymbolChange (newValue: string, oldValue:string) {
        if(newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.stockInputValid = true;
            this.fetchStockPrice(newValue);
        }
    }

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
        this.stockSymbol = this.stockInput.value;
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
            // this.initalStockSymbol = this.stockSymbol;
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true;
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

    // @Listen('nksymbolSelected') listen to only in the component dom (shadoDom)
    @Listen('body:nksymbolSelected') // listen globaly (in the body)
    onStockSymbolSelected(event: CustomEvent) {
        console.log('stock symbol selected: ' + event.detail)
        if(event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    }

    fetchStockPrice(stockSymbol: string) {
        this.loading = true;
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
                this.loading = false;
            })
            .catch(err => {
                this.error = err.message;
                this.fetchPrice = null;
                this.loading = false;
            });
    }

    hostData() {
        return { class: this.error ? 'error' : '' };
    }

    render() {
        let dataContent = <p>Please enter a symbol!</p>;
        if(this.error) {
            dataContent = <p>{this.error}</p>;
        }
        if(this.fetchPrice) {
            dataContent = <p>Price: ${this.fetchPrice}</p>;
        }
        if(this.loading) {
            dataContent = <nk-spinner></nk-spinner>;
        }
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input  
                    id="stock-symbol" 
                    ref={el => this.stockInput = el} 
                    value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)}
                />
                <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
            </form>,
            <div>{dataContent}</div>
        ];
    }
}