import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
const { isEmpty } = require('../../../helpers');

function EditCategory() {
	const [ name, setName ] = useState('');
	const [ parentId, setParentId ] = useState(0);
	const [ categories, setCategories ] = useState([ {} ]);
	// componentdidmount hooks
	const { catId } = useParams();
	const history = useHistory();

	useEffect(
		() => {
			console.log(catId);
			axios.get(`/api/v1/categories/${catId}`).then((res) => {
				console.log(res.data);
				const { name, parentCategory } = res.data.data[0];
				setName(name);
				setParentId(parentCategory);
			});

			axios.get('/api/v1/categories/').then((res) => {
				const { data } = res.data;
				setCategories(data);
			});
		},
		[ catId ]
	);

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleSelect = (e) => {
		console.log(e.target.value);
		setParentId(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// check empty
		if (!(isEmpty(name) || isEmpty(parentId))) {
			const parentCategory = parentId ? parentId : null;
			const updateCategory = {
				name,
				parentCategory
			};
			axios.patch(`/api/v1/categories/${catId}`, updateCategory).then((res) => {
				setName('');
				history.push('/categories');
			});
		} else {
			// somefield is empty
			console.log('there is some empty field');
		}
	};

	const renderOptions = () => {
		return categories.map((category, i) => (
			<option key={i} value={category._id}>
				{' '}
				{category.name}{' '}
			</option>
		));
	};
	return (
		<div>
			{/* DataTales Example */}
			<div className='card shadow mb-4'>
				<div className='card-header py-3' style={{ position: 'relative' }}>
					<h6 className='m-0 font-weight-bold text-primary'>You can add new Category</h6>
					<button
						onClick={() => history.push('/categories')}
						type='button'
						className='btn btn-primary float-right'
						style={{ marginTop: '-28px' }}
					>
						<i className='far fa-eye' style={{ padding: '5px' }} />
						View All Categories
					</button>
				</div>
				<div className='card-body'>
					<form>
						<div className='row'>
							<div className='form-group col-md-4'>
								<label htmlFor='catName'>Category Name</label>
								<input
									onChange={handleName}
									type='text'
									value={name}
									className='form-control'
									placeholder='Category Name'
								/>
							</div>
							<div className='form-group col-md-4'>
								<label htmlFor='parentCat'>Parent Category</label>
								<select value={parentId} onChange={handleSelect} className='form-control' name='parentCat' id=''>
									<option value={0}>Default</option>
									{categories.length && renderOptions()}
								</select>
							</div>
						</div>

						<button onClick={handleSubmit} type='submit' className='btn btn-primary'>
							Update Category
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default EditCategory;
