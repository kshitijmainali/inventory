import React from 'react';
import axios from 'axios';
const { isEmpty } = require('../../helpers');
class EditStock extends React.Component {
	state = {
		product: {},
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
		axios.get(`/api/v1/purchases/product/${productId}`).then((res) => {
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
						<ul class='nav nav-tabs' id='myTab' role='tablist'>
							<li class='nav-item'>
								<a
									class='nav-link active'
									id='home-tab'
									data-toggle='tab'
									href='#home'
									role='tab'
									aria-controls='home'
									aria-selected='true'
								>
									Home
								</a>
							</li>
							<li class='nav-item'>
								<a
									class='nav-link'
									id='profile-tab'
									data-toggle='tab'
									href='#profile'
									role='tab'
									aria-controls='profile'
									aria-selected='false'
								>
									Profile
								</a>
							</li>
							<li class='nav-item'>
								<a
									class='nav-link'
									id='contact-tab'
									data-toggle='tab'
									href='#contact'
									role='tab'
									aria-controls='contact'
									aria-selected='false'
								>
									Contact
								</a>
							</li>
						</ul>
						<div class='tab-content' id='myTabContent'>
							<div class='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>
								...
							</div>
							<div class='tab-pane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
								...
							</div>
							<div class='tab-pane fade' id='contact' role='tabpanel' aria-labelledby='contact-tab'>
								...
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditStock;
