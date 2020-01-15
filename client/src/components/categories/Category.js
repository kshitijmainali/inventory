import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

const Actions = ({ category, handleDelete }) => {
	return (
		<div>
			<Link
				to={{
					pathname: `/categories/edit/${category._id}`,
					state: {
						id: category._id,
						name: category.name,
						parentCategory: category.parentCategory,
					},
				}}
				className='btn btn-primary btn-circle btn-sm'
				style={{ marginRight: 10 }}
			>
				<i className='fas fa-pencil-alt' />
			</Link>
			<div className='btn btn-info btn-circle btn-sm' style={{ cursor: 'pointer', marginRight: 10 }}>
				<i className='far fa-eye' />
			</div>
			<div
				onClick={() => handleDelete(category)}
				style={{ cursor: 'pointer' }}
				className='btn btn-danger btn-circle btn-sm'
			>
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
					width: 100,
				},
			],
			rows: [],
		},
	};

	componentDidMount() {
		this.fetchUpdatedCategories();
	}
	fetchUpdatedCategories = () => {
		let rows = [];
		axios.get('api/v1/categories').then((res) => {
			const { data } = res.data;
			console.log(data);
			data.forEach((row) => {
				let newRow = {
					name: row.name,
					parentCategory: row.parentCategory ? row.parentCategory.name : 'None',
					actions: <Actions handleDelete={this.handleDelete} category={row} />,
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
