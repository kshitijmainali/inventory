import React from 'react';
import axios from 'axios';
const { isEmpty } = require('../../helpers');
class EditStock extends React.Component {
	state = {
		productId: '',
		productCode: '',
		name: '',
		price: 0,
		quantity: 0,
		category: 0,
		categories: []
	};
	componentDidMount() {
		const { productId } = this.props.match.params;
		console.log(productId);
		axios.get(`/api/v1/products/${productId}`).then((res) => {
			console.log(res.data);
			const { name, productCode, quantity, price, category } = res.data.data[0];
			this.setState({ name, productCode, quantity, price, category, productId });
		});
		axios.get('/api/v1/categories/').then((res) => {
			const { data } = res.data;
			this.setState({ categories: data });
		});
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// check empty
		if (!(isEmpty(this.state.name) || isEmpty(this.state.productCode))) {
			const { name, productCode, quantity, price } = this.state;
			const category = this.state.category ? this.state.category : null;
			const updateProduct = {
				name,
				productCode,
				quantity,
				price,
				category
			};
			axios.patch(`/api/v1/products/${this.state.productId}`, updateProduct).then((res) => {
				console.log(res);
				this.props.history.push('/stocks');
			});
		} else {
			// somefield is empty
			console.log('there is some empty field');
		}
	};

	renderOptions = () => {
		return this.state.categories.map((category, i) => (
			<option key={i} value={category._id}>
				{' '}
				{category.name}{' '}
			</option>
		));
	};
	render() {
		return (
			<div>
				{/* DataTales Example */}
				<div className='card shadow mb-4'>
					<div className='card-header py-3' style={{ position: 'relative' }}>
						<h6 className='m-0 font-weight-bold text-primary'>Update Item to Stock</h6>
					</div>
					<div className='card-body'>
						<form>
							<div className='row'>
								<div className='form-group col-md-4'>
									<label htmlFor='exampleInputEmail1'>Product Code</label>
									<input
										type='text'
										className='form-control'
										placeholder='Product Code'
										value={this.state.productCode}
										name='productCode'
										onChange={this.handleChange}
									/>
								</div>
								<div className='form-group col-md-4'>
									<label htmlFor='exampleInputEmail1'>Name</label>
									<input
										type='text'
										name='name'
										className='form-control'
										placeholder='Product Name'
										value={this.state.name}
										onChange={this.handleChange}
									/>
								</div>
								<div className='form-group col-md-4'>
									<label htmlFor='category'>Category</label>
									<select
										value={this.state.category}
										onChange={this.handleChange}
										className='form-control'
										name='category'
										id=''
									>
										{this.state.categories.length && this.renderOptions()}
									</select>
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-md-4'>
									<label htmlFor='exampleInputEmail1'>Quantity</label>
									<input
										type='text'
										name='quantity'
										className='form-control'
										placeholder='Product Quantity'
										value={this.state.quantity}
										onChange={this.handleChange}
									/>
								</div>
								<div className='form-group col-md-4'>
									<label htmlFor='exampleInputEmail1'>Price</label>
									<input
										type='text'
										name='price'
										className='form-control'
										placeholder='Product Rate'
										value={this.state.price}
										onChange={this.handleChange}
									/>
								</div>
							</div>

							<button onClick={this.handleSubmit} type='submit' className='btn btn-primary'>
								Update Item
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default EditStock;
