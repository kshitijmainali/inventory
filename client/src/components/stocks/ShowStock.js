import React from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

const { isEmpty, formatDate } = require('../../helpers');

class EditStock extends React.Component {
	state = {
		purchaseLoading: true,
		purchaseData: {
			columns: [
				{
					label: 'Date',
					field: 'date',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Transaction Code',
					field: 'transactionCode',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Product Code',
					field: 'productCode',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Product Name',
					field: 'name',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Quantity',
					field: 'quantity',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Rate',
					field: 'price',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Total',
					field: 'totalPrice',
					sort: 'asc',
					width: 150
				}
			],
			rows: []
		},
		product: {},
		purchases: {},
		sells: {}
	};
	componentDidMount() {
		const { productId } = this.props.match.params;
		console.log(productId);
		axios.get(`/api/v1/products/${productId}`).then((res) => {
			console.log(res.data);
			this.setState({ product: res.data.data[0] }, () => {
				this.fetchPurchases();
			});
		});
	}

	fetchPurchases = () => {
		const { productId } = this.props.match.params;
		let rows = [];
		axios.get(`/api/v1/purchases/product/${productId}`).then((res) => {
			const { data } = res.data;
			console.log(data);
			data.forEach((row) => {
				let newRow = {
					name: this.state.product.name,
					transactionCode: row.transactionCode,
					productCode: this.state.product.productCode,
					price: row.product.price,
					quantity: row.quantity,
					totalPrice: row.product.price * row.product.quantity,
					date: formatDate(row.date)
				};
				rows.push(newRow);
				console.log(newRow);
			});
			let stateData = { columns: [], rows: [] };
			stateData.columns = this.state.purchaseData.columns;
			stateData.rows = rows;
			this.setState({ purchaseData: stateData, purchaseLoading: false });
		});
	};

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
						<h6 className='m-0 font-weight-bold text-primary'>Stats of {this.state.product.name} </h6>
					</div>
					<div className='card-body'>
						<ul class='nav nav-tabs' id='myTab' role='tablist'>
							<li class='nav-item' style={{ width: 400 }}>
								<a
									class='nav-link active'
									id='home-tab'
									data-toggle='tab'
									href='#home'
									role='tab'
									aria-controls='home'
									aria-selected='true'
								>
									Purchase History
								</a>
							</li>
							<li class='nav-item' style={{ width: 400 }}>
								<a
									class='nav-link'
									id='profile-tab'
									data-toggle='tab'
									href='#profile'
									role='tab'
									aria-controls='profile'
									aria-selected='false'
								>
									Sells History
								</a>
							</li>
						</ul>
						<div class='tab-content' id='myTabContent'>
							<div class='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>
								<div className='card-body'>
									{this.state.purchaseLoading ? (
										''
									) : (
										<MDBDataTable striped bordered hover data={this.state.purchaseData} />
									)}
								</div>
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
