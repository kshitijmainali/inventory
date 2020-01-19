import React from 'react';
function StockHeader(props) {
	return (
		<div className='card-header py-3' style={{ position: 'relative' }}>
			<h6 className='m-0 font-weight-bold text-primary'>Categories</h6>
			<button
				onClick={() => props.history.push('/categories/new')}
				type='button'
				className='btn btn-primary float-right'
				style={{ marginTop: '-28px' }}
			>
				<i className='fa fa-plus' style={{ padding: '5px' }} />
				Add New Category
			</button>
		</div>
	);
}

export default StockHeader;
