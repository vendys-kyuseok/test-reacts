import React from "react";
import PropTypes from 'prop-types'; 

export default class ContactDetails extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        }

        this.hendleToggle = this.hendleToggle.bind(this);
        this.hendleChange = this.hendleChange.bind(this);
        this.hendleEdit = this.hendleEdit.bind(this);

        this.hendleKeyPress = this.hendleKeyPress.bind(this);
    }

    hendleToggle() {
        if(!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        } else {
            this.hendleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    hendleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    hendleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    hendleKeyPress(e) {
        if(e.charCode === 13) {
            this.hendleToggle();
        }
    }

    render() {

        const edit = (
            <div>
                <p>
                    <input 
                        type='text' name='name'
                        placeholder='name'
                        value={this.state.name}
                        onChange={this.hendleChange}
                        onKeyPress={this.hendleKeyPress}
                    />
                </p>

                <p>
                    <input 
                        type='text' name='phone' 
                        placeholder='phone' 
                        value={this.state.phone}
                        onChange={this.hendleChange}
                        onKeyPress={this.hendleKeyPress}
                    />
                </p>
            </div>
        )

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const view = this.state.isEdit ? edit : details;

        const blank = (<div>Not Selected</div>)

        return (
            <div>
                <h1>Details</h1>
                {this.props.isSelected ? view : blank}

                <p>
                    <button onClick={this.props.onRemove}>Remove</button>

                    <button onClick={this.hendleToggle}>
                        {this.state.isEdit ? 'OK' : 'Edit'}
                    </button>
                </p>

            </div>
        )
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => {console.error('Error')},
    onEdit: () => {console.error('Error')}
}

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
}

