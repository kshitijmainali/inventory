import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
const { formatDate } = require('../../helpers');

const Actions = ({ product, handleDelete }) => {
	return (
		<div>
			<Link to={`/stock/edit/${product._id}`} className='btn btn-primary btn-circle btn-sm' style={{ marginRight: 10 }}>
				<i className='fas fa-pencil-alt' />
			</Link>
			<div className='btn btn-info btn-circle btn-sm' style={{ cursor: 'pointer', marginRight: 10 }}>
				<i className='far fa-eye' />
			</div>
			<div
				onClick={() => handleDelete(product)}
				style={{ cursor: 'pointer' }}
				className='btn btn-danger btn-circle btn-sm'
			>
				<i className='fas fa-times' />
			</div>
		</div>
	);
};

class Stock extends Component {
	static defaultProps = {
		data: [
			{
				productCode: 'JX0011',
				productName: 'Mobile',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			}
		]
	};
	state = {
		loading: true,
		checkboxState: false,
		data: {
			columns: [
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
					label: 'Price',
					field: 'price',
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
					label: 'Date of Entry',
					field: 'dateOfEntry',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Category',
					field: 'category',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
					width: 150
				}
			],
			rows: []
		}
	};

	componentDidMount() {
		this.fetchUpdateProducts();
	}

	fetchUpdateProducts = () => {
		let rows = [];
		axios.get('api/v1/products').then((res) => {
			const { data } = res.data;
			console.log(data);
			data.forEach((row) => {
				let newRow = {
					name: row.name,
					productCode: row.productCode,
					price: row.price,
					quantity: row.quantity,
					dateOfEntry: formatDate(row.date),
					category: row.category ? row.category.name : 'None',
					actions: <Actions handleDelete={this.handleDelete} product={row} />
				};
				rows.push(newRow);
			});
			let stateData = { columns: [], rows: [] };
			stateData.columns = this.state.data.columns;
			stateData.rows = rows;
			this.setState({ data: stateData, loading: false });
		});
	};
	checkRemoveBtn = () => {
		this.setState({ checkboxState: !this.state.checkboxState });
	};

	handleDelete = (product) => {
		console.log(product._id);
		axios.delete(`/api/v1/products/${product._id}`).then((res) => this.fetchUpdateProducts());
	};
	render() {
		return (
			<div>
				{/* DataTales Example */}
				<div className='card shadow mb-4'>
					<Header history={this.props.history} checkRemoveBtn={this.checkRemoveBtn} />
					<div className='card-body'>
						{this.state.loading ? '' : <MDBDataTable striped bordered hover data={this.state.data} />}
					</div>
				</div>
			</div>
		);
	}
}

export default Stock;
