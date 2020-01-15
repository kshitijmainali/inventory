import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

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
						quantity: product.quantity,
					},
				}}
				className='btn btn-primary btn-circle btn-sm'
			>
				<i className='fas fa-pencil-alt' />
			</Link>
			<div className='btn btn-info btn-circle btn-sm'>
				<i className='far fa-eye' />
			</div>
			<div className='btn btn-danger btn-circle btn-sm'>
				<i className='fas fa-times' />
			</div>
		</div>
	);
};

class Category extends Component {
	static defaultProps = {
		data: [
			{
				name: 'Mobile',
				parentId: 'JX0011',
			},
		],
	};
	state = {
		loading: true,
		checkboxState: false,
		data: {
			columns: [
				{
					label: 'Category Name',
					field: 'name',
					sort: 'asc',
					width: 150,
				},
				{
					label: 'Parent Category',
					field: 'parentCategory',
					sort: 'asc',
					width: 150,
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
					width: 150,
				},
			],
			rows: [],
		},
	};

	componentDidMount() {
		let rows = [];
		axios.get('api/v1/categories').then((res) => {
			res.data.forEach((row) => {
				console.log(row);
				let newRow = {
					name: row.name,
					parentCategory: row.parentCategory ? row.parentCategory : 'None',
					actions: <Actions product={row} />,
				};
				rows.push(newRow);
			});
			let data = this.state.data;
			data.rows = rows;
			this.setState({ data, loading: false });
		});
	}
	checkRemoveBtn = () => {
		this.setState({ checkboxState: !this.state.checkboxState });
	};
	render() {
		return (
			<div>
				{/* DataTales Example */}
				<div className='card shadow mb-4'>
					<CategoryHeader checkRemoveBtn={this.checkRemoveBtn} />
					<div className='card-body'>
						{this.state.loading ? '' : <MDBDataTable striped bordered hover data={this.state.data} />}
					</div>
				</div>
			</div>
		);
	}
}

export default Category;
