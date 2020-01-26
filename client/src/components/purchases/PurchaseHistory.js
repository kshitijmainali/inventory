import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { formatDate } from '../../helpers';

// const Actions = ({ purchase, handleDelete }) => {
// 	return (
// 		<div>
// 			<Link to={`/stocks/details/${purchase._id}`} className='btn btn-info btn-circle btn-sm' style={{ cursor: 'pointer', marginRight: 10 }}>
// 				<i className='far fa-eye' />
// 			</Link>
// 		</div>
// 	);
// };

class PurchaseHistory extends Component {
	static defaultProps = {
		data: [
			{
				name: 'Mobile',
				parentId: 'JX0011'
			}
		]
	};
	state = {
		loading: true,
		checkboxState: false,
		data: {
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
		}
	};

	componentDidMount() {
		this.fetchPurchases();
	}
	fetchPurchases = () => {
		let rows = [];
		axios.get('api/v1/purchases').then((res) => {
			const { data } = res.data;
			console.log(data);
			data.forEach((row) => {
				let newRow = {
					name: row.product.name,
					transactionCode: row.transactionCode,
					productCode: row.product.productCode,
					price: row.product.price,
					quantity: row.quantity,
					totalPrice: row.product.price * row.product.quantity,
					date: formatDate(row.date)
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
	handleDelete = (category) => {
		console.log(category._id);
		axios.delete(`/api/v1/categories/${category._id}`).then((res) => this.fetchUpdatedCategories());
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

export default PurchaseHistory;
