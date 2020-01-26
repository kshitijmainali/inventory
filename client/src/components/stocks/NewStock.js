import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { generateProductCode } = require('../../helpers');

class NewStock extends React.Component {
	state = {
		suggestion: { data: [] },
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
		this.setState({ productCode: generateProductCode() });
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
			console.log(res);
			this.setState((prevState) => ({
				productCode: generateProductCode(),
				name: '',
				price: '',
				quantity: ''
			}));
		});
	};

	handleName = (e) => {
		this.setState({ name: e.target.value });
		if (e.target.value)
			axios.get(`api/v1/products/search/${e.target.value}`).then((res) => this.setState({ suggestion: res.data }));
		else this.setState({ suggestion: { data: [] } });
	};
	renderOptions = () => {
		return this.state.categories.map((category, i) => (
			<option key={i} value={category._id}>
				{' '}
				{category.name}{' '}
			</option>
		));
	};

	renderSuggestions = () => {
		console.log(this.state.suggestion.data);
		if (this.state.suggestion.data.length)
			return this.state.suggestion.data.map((el, i) => (
				<Link to={`/stock/edit/${el._id}`} style={{ cursor: 'pointer' }} key={i}>
					{el.name}
				</Link>
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
										disabled
									/>
								</div>
								<div className='form-group col-md-4'>
									<label htmlFor='name'>Name</label>
									<input
										type='text'
										className='form-control'
										placeholder='Product Name'
										value={this.state.name}
										name='name'
										onChange={this.handleName}
									/>
									<div style={{ position: 'absolute', zIndex: 1, backgroundColor: 'white', width: '95%' }}>
										{this.renderSuggestions()}
									</div>
								</div>
								<div className='form-group col-md-4'>
									<label htmlFor='category'>Category</label>
									<select onChange={this.handleChange} className='form-control' name='category' id=''>
										<option value='null'>Select</option>
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
