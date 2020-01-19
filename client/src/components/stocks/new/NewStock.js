import React from 'react';
import axios from 'axios';

class NewStock extends React.Component {
	state = {
		productCode: '',
		name: '',
		quantity: 0,
		price: 0,
		category: '',
		categories: []
	};

	componentDidMount() {
		axios.get('/api/v1/categories/').then((res) => {
			const { data } = res.data;
			this.setState({ categories: data });
		});
	}
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		const { name, productCode, price, quantity, category } = this.state;
		e.preventDefault();
		const newProduct = {
			name,
			productCode,
			price,
			quantity,
			category
		};
		axios.post('/api/v1/products', newProduct).then((res) => {
			this.setState((prevState) => ({
				productCode: '',
				name: '',
				price: '',
				quantity: ''
			}));
		});
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
						<h6 className='m-0 font-weight-bold text-primary'>Add New Item to Stock</h6>
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
										className='form-control'
										placeholder='Product Name'
										value={this.state.name}
										name='name'
										onChange={this.handleChange}
									/>
								</div>
								<div className='form-group col-md-4'>
									<label htmlFor='category'>Category</label>
									<select onChange={this.handleChange} className='form-control' name='category' id=''>
										{this.state.categories.length && this.renderOptions()}
									</select>
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-md-4'>
									<label htmlFor='exampleInputEmail1'>Quantity</label>
									<input
										type='number'
										className='form-control'
										value={this.state.quantity}
										name='quantity'
										placeholder='Product Quantity'
										onChange={this.handleChange}
									/>
								</div>
								<div className='form-group col-md-4'>
									<label htmlFor='exampleInputEmail1'>Rate</label>
									<input
										type='number'
										className='form-control'
										value={this.state.price}
										name='price'
										placeholder='Product Rate'
										onChange={this.handleChange}
									/>
								</div>
							</div>

							<button onClick={this.handleSubmit} type='submit' className='btn btn-primary'>
								Add Item
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default NewStock;
