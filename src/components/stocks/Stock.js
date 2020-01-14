import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StockHeader from './StockHeader';
import { MDBDataTable } from 'mdbreact';

const Actions = ({ product }) => {
	return (
		<div>
			<Link
				to={{
					pathname: `/stock/edit/${product.productCode}`,
					state: {
						productCode: product.productCode,
						productName: product.productName,
						dateOfEntry: product.dateOfEntry,
						rate: product.rate,
						quantity: product.quantity
					}
				}}
				className="btn btn-primary btn-circle btn-sm"
			>
				<i className="fas fa-pencil-alt" />
			</Link>
			<div className="btn btn-info btn-circle btn-sm">
				<i className="far fa-eye" />
			</div>
			<div className="btn btn-danger btn-circle btn-sm">
				<i className="fas fa-times" />
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
			},
			{
				productCode: 'RM2002',
				productName: 'Earphone',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'ER4143',
				productName: 'Laptop',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'RT5444',
				productName: 'Mouse',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'ER4225',
				productName: 'Cooler',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'TG6566',
				productName: 'Mobile Cover',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'YHU777',
				productName: 'Jack',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'YHU778',
				productName: 'Jack',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'YHU779',
				productName: 'Jack',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'YHU7710',
				productName: 'Jack',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'YHU7711',
				productName: 'Jack',
				dateOfEntry: '2019-02-10',
				quantity: '10000',
				rate: '$100'
			},
			{
				productCode: 'KIU8912',
				productName: 'Battery',
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
					label: 'Product',
					field: 'productName',
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
					label: 'Rate',
					field: 'rate',
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
		let rows = this.props.data;
		rows.forEach((row) => {
			row.actions = <Actions product={row} />;
		});
		let data = this.state.data;
		data.rows = rows;
		this.setState({ data, loading: false });
	}
	checkRemoveBtn = () => {
		this.setState({ checkboxState: !this.state.checkboxState });
	};
	render() {
		return (
			<div>
				{/* DataTales Example */}
				<div className="card shadow mb-4">
					<StockHeader checkRemoveBtn={this.checkRemoveBtn} />
					<div className="card-body">
						{this.state.loading ? '' : <MDBDataTable striped bordered hover data={this.state.data} />}
						{/* <StockTable checkboxState={this.state.checkboxState} data={this.state.data} /> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Stock;
