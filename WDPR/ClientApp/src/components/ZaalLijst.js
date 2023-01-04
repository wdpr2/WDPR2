﻿import React, { Component } from "react";

class ZaalLijst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: []
        };
    }

    componentDidMount = async () => {
        const res = await fetch("https://localhost:7260/Zaal");
        console.log(res.body);
        const data = await res.json();
        this.setState({ buttons: data });
    };

    // Function to generate buttons based on response data
    generateButtons = response => {
        // Create an array of buttons
        const buttons = response.map(zaal => {
            // Return a new button element for each zaal
            return (
                <button
                    key={`Zaal ${zaal.zaalId}`}
                    onClick={this.props.onButtonClick.bind(this, zaal.zaalId)}
                >
                    Zaal {zaal.zaalId}
                </button>
            );
        });

        // Return the array of buttons
        return buttons;
    };

    render() {
        return <div>{this.generateButtons(this.state.buttons)}</div>;
    }
}

export default ZaalLijst;