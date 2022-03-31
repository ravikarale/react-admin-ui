import React, { Component } from 'react';
import { Input, Label, FormGroup } from 'reactstrap';

class FormInput extends Component {
	constructor(props){
		super(props)

		this.state = {
			focused: false
		}

		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}
	handleFocus(event){
		this.setState({
			focused: true,
		})
	}

	handleBlur(event){
		this.setState({
			focused: false,
		})
	}

	render() {
		const { type, value, onChange, label, disabled, error, 
			className, labelClass, maxLength, accept, checked, filename, name, onKeyPress } =  this.props
		return (
			<React.Fragment>
				<FormGroup className={className}>
					<Label className={labelClass}>{label}</Label>
					<Input type={type || "text" || "file" || 'checkbox'} className={`form-control ${this.state.focused || !!value || !!filename ? 'field-focus' : ''}`}
					    disabled={disabled}
						value={value}
						name={name}
						filename={filename} 
						onChange={onChange}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						maxLength={maxLength}
						accept={accept}
						checked={checked}
						onKeyPress={onKeyPress}
					/>
				</FormGroup>
				{
					error ? 
					(<div className="error-msg">{error}</div>) : null
				}
			</React.Fragment>
		)
	}
}

export default FormInput;