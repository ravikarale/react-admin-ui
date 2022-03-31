import React, { Component } from 'react'
import FormInput from '../shared/FormInput';
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { get as _get } from 'lodash';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('The email is invalid')
        .required('Email is required'),
	name: Yup.string().matches(/^[a-zA-Z_ ]*$/, 'Only alphabets are accepted')
		.required('Name is required')
		.min(1, 'Must be less than 25 digits')
		.max(25, 'Must be less than 25 digits'),
	role: Yup.string().matches(/^[a-zA-Z_ ]*$/, 'Only alphabets are accepted')
        .required('Role is required')
		.min(1, 'Must be less than 10 digits')
		.max(10, 'Must be less than 10 digits'),
	}
)

const handleSubmit = (values, setFieldError, clearForm, toggle, selectedUser, users, setFieldValue, handleEditUserSubmit)=>{
    try {
		let findUser = users.find(user => user === selectedUser)
		if(findUser){
			findUser.name = values.name
			findUser.email = values.email
			findUser.role = values.role
		}
		handleEditUserSubmit(users)
    } catch (e) {
        return;
    }
    toast.success("User updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER
    });
    toggle()
    clearForm()
}

class EditUserPopup extends Component {
	constructor(props) {
		super(props)
		this.clearForm = this.clearForm.bind(this)
	}
	
	clearForm() {
		this.props.setValues({
			name: '',
			email: '',
            userId: "",
			role: "",
		})
	}

	componentDidMount() {
		this.clearForm();
        try {
            let user = this.props.editUser
            this.props.setValues({
                name: user.name,
                email: user.email,
                role: user.role,
                userId: user.userId
            })
        } catch (e) {
            toast.error("Oops! Something went wrong. Please try again.", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return;
        }
	}
	

	render() {
		const { values, handleChange } = this.props
		return (
			<div className="user-edit-modal">
				<Modal isOpen={!!this.props.editUser}  className="user-edit-modal auto-height">
					<ModalHeader ></ModalHeader>
					<ModalBody>
						<div>
							<div className="form-container clearfix">
								<h2 className="title-form">Edit User</h2>
								
								<Form className="clearfix" noValidate onSubmit={this.props.handleSubmit}>
									<div className="form">
										<FormInput label="Name"
											value={values.name}
											onChange={handleChange}
											name="name"
											error={this.props.errors.firstName} 
										/>
										<FormInput type="email"
											label="Email ID"
											value={values.email}
											name="email"
											error={this.props.errors.email}
											onChange={handleChange}
                                        />
										<FormInput label="Role"
											value={values.role}
											name="role"
											error={this.props.errors.role} 
											onChange={handleChange}
										/>
									</div>
									<button type="submit" className="btn btn-primary">Update</button>
								</Form>
							</div>
						</div>
					</ModalBody>
				</Modal>

			</div>
		)
	}
}


export default  withFormik({
	enableReinitialize: true,
	validateOnChange: false,
	validateOnBlur: false,
	handleSubmit: ( values,{setFieldError, setFieldValue, props}) => {
        handleSubmit(values, setFieldError, props.clearForm, props.toggle, props.editUser, props.users, setFieldValue, props.handleEditUserSubmit)
    }, 
	mapPropsToValues: () => ({
		name: '',
		email: '',
		role: '',
	}),
	validationSchema,
})(EditUserPopup)