import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function StockHeader(props) {
	const [ removeItem, setRemoveItem ] = useState(false);
	const handleRemoveItem = () => {
		setRemoveItem(!removeItem);
		props.checkRemoveBtn();
	};
	return (
		<div className="card-header py-3" style={{ position: 'relative' }}>
			<h6 className="m-0 font-weight-bold text-primary">Stocks</h6>
			<button type="button" className="btn btn-primary float-right" style={{ marginTop: '-28px' }}>
				<i className="fa fa-plus" style={{ padding: '5px' }} />
				<Link style={{ textDecoration: 'none', color: 'white' }} to="/stocks/new">
					Add New Item
				</Link>
			</button>
		</div>
	);
}

export default StockHeader;
