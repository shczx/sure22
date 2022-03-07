import React from "react";
import ReactDOM from 'react-dom';
import { fromRange, toRange } from 'xpath-range';
import wrapRange from 'wrap-range-text';
import PopUpWindow from './PopUpWindow';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            startOffset: 0,
            end: '',
            endOffset: 0,
            toggle: false,
            input: '',
        };
        this.handleSelection = this.handleSelection.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        const text = document.getElementById('text');
        text.onmouseup = this.handleSelection;

        fetch('/api/notes/')
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            const root = document.getElementById("text");
            data.forEach((range) => {
                let span = document.createElement('span');
                span.className = 'highlight';
                wrapRange(span, toRange(range.start, range.startOffset, range.end, range.endOffset, root));
            });
        })
        .catch((error) => console.log(error));
    }

    handleSelection() {
        const { toggle } = this.state;
        if (toggle) {
            alert('You must enter some input before highlighting other texts!');
            return;
        }

        const range = window.getSelection().getRangeAt(0);
        if (range.collapsed) return;
        const root = document.getElementById("text")
        const { start, startOffset, end, endOffset } = fromRange(range, root);
        let span = document.createElement('span');
        span.className = 'highlight';
        wrapRange(span, range);

        this.setState({
            toggle: true,
            start: start,
            startOffset: startOffset,
            end: end,
            endOffset: endOffset,
        })
    }

    handleInputChange(event) {
        const { value } = event.target;
        this.setState({input: value });
    }

    handleInput(event) {
        event.preventDefault();
        const {start, startOffset, end, endOffset, input} = this.state;
        fetch('/api/notes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start: start,
                                   startOffset: startOffset,
                                   end: end,
                                   endOffset: endOffset,
                                   input: input }),
        })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            this.setState({
                input: '',
                toggle: false,
                start: '',
                startOffset: 0,
                end: '',
                endOffset: 0,
            });
        })
        .catch((error) => console.log(error));
    }

    render() {
        const { toggle, input } = this.state;
        return (
        toggle && <PopUpWindow 
                   input={input}
                   handleInputChange={this.handleInputChange}
                   handleInput={this.handleInput}/>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('reactEntry'),
);

export default App