import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewCategory() {
	const [ name, setName ] = useState('');
	const [ parentId, setParentId ] = useState('');
	const [ categories, setCategories ] = useState([ {} ]);

	// componentdidmount hooks
	useEffect(() => {
		axios.get('/api/v1/categories/').then((res) => {
			console.log(res.data);
			setCategories(res.data);
		});
	}, []);

	const handleName = (e) => {
		setName(e.target.value);
		console.log(e.target.value);
	};

	const handleSelect = (e) => {
		console.log(e.target.value);
		setParentId(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const parentCategory = parentId ? parentId : null;
		const newCategory = {
			name,
			parentCategory,
		};
		axios.post('/api/v1/categories', newCategory).then((res) => {
			setCategories((prevCategories) => [ ...prevCategories, res.data.newData ]);
			setName('');
		});
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
					<button type='button' className='btn btn-primary float-right' style={{ marginTop: '-28px' }}>
						<i className='fa fa-plus' style={{ padding: '5px' }} />
						<Link style={{ textDecoration: 'none', color: 'white' }} to='/categories'>
							View All Categories
						</Link>
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
								<select onChange={handleSelect} className='form-control' name='parentCat' id=''>
									<option value={0}>Default</option>
									{categories.length && renderOptions()}
								</select>
							</div>
						</div>

						<button onClick={handleSubmit} type='submit' className='btn btn-primary'>
							Add Category
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default NewCategory;
