import React from 'react';
import { Link } from 'react-router-dom';
function StockHeader(props) {
	return (
		<div className='card-header py-3' style={{ position: 'relative' }}>
			<h6 className='m-0 font-weight-bold text-primary'>Categories</h6>
			<button type='button' className='btn btn-primary float-right' style={{ marginTop: '-28px' }}>
				<i className='fa fa-plus' style={{ padding: '5px' }} />
				<Link style={{ textDecoration: 'none', color: 'white' }} to='/categories/new'>
					Add New Category
				</Link>
			</button>
		</div>
	);
}

export default StockHeader;
