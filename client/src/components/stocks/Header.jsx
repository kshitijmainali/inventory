import React from 'react';
function StockHeader(props) {
	return (
		<div className='card-header py-3' style={{ position: 'relative' }}>
			<h6 className='m-0 font-weight-bold text-primary'>Stocks</h6>
			<button
				onClick={() => props.history.push('/stocks/add')}
				type='button'
				className='btn btn-primary float-right'
				style={{ marginTop: '-28px' }}
			>
				<i className='fa fa-plus' style={{ padding: '5px' }} />
				Add New Item
			</button>
		</div>
	);
}

export default StockHeader;
