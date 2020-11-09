import React from 'react';
import PropTypes from 'prop-types'; 

export default class ContactCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        }
        this.hendleChange = this.hendleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hendleKeyPress = this.hendleKeyPress.bind(this);
    }


    hendleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        }

        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        })

        this.nameInput.focus();
    }

    hendleKeyPress(e) {
        if(e.charCode === 13) {
            this.handleClick();
        }
    }

    render() {
        return (
            <div>
                <h1>Create Contact</h1>

                <p>
                    <input 
                        type='text' name='name'
                        placeholder='name'
                        value={this.state.name}
                        onChange={this.hendleChange}
                        ref={ref => { this.nameInput = ref }}
                        //onKeyPress={this.hendleKeyPress}
                    />

                    <input 
                        type='text' name='phone' 
                        placeholder='phone' 
                        value={this.state.phone}
                        onChange={this.hendleChange}
                        onKeyPress={this.hendleKeyPress}
                    />

                    <button onClick={this.handleClick}>Create</button>
                </p>
            </div>
        )
    }
}

ContactCreate.propTypes = {
    onCreate: PropTypes.func
}

ContactCreate.defaultProps = {
    onCreate: () => { console.error('onCreate not defined'); }
}