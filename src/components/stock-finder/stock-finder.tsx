import { Component, State,Event, EventEmitter} from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'nk-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})

export class StockFinder {

    stockNameInput: HTMLInputElement;

    @State() searchResults: {symbol: string, name: string}[] = [];

    @Event({bubbles: true, composed: true}) nksymbolSelected: EventEmitter<string>;

    onFindStocks(event: Event) {
        event.preventDefault();
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parseRes => {
                this.searchResults = parseRes['bestMatches'].map(match => ({ name: match['2. name'], symbol: match['1. symbol'] }));
                console.log(this.searchResults);
            })
            .catch(err => {
                console.log(err);
            });
    }

    onSelectSymbol(symbol: string) {
        this.nksymbolSelected.emit(symbol);
    }

    render() {
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input  
                    id="stock-symbol" 
                    ref={el => this.stockNameInput = el} 
                />
                <button type="submit">Find!</button>
            </form>,
            <ul>
                {this.searchResults.map(res => (
                    <li onClick={this.onSelectSymbol.bind(this, res.symbol)}><strong>{res.symbol}</strong> - {res.name}</li>
                ))}
            </ul>,
        ];
    }
}