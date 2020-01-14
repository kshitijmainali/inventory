import React from 'react';

function StockTable({ data, checkboxState }) {
	return (
		<div>
			<div className="table-responsive">
				<table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
					<thead>
						<tr>
							<th>Product Code</th>
							<th>Product</th>
							<th>Date of entry</th>
							<th>Rate</th>
							<th>Quantity</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, i) => (
							<tr key={i}>
								<td>
									{checkboxState ? <input type="checkbox" /> : ''} {item.productCode}
								</td>
								<td>{item.productName}</td>
								<td>{item.dateOfEntry}/11/28</td>
								<td>{item.quantity}</td>
								<td>{item.rate}</td>
								<td>
									<a href="/" className="btn btn-primary btn-circle btn-sm">
										<i className="fas fa-pencil-alt" />
									</a>
									<span />
									<a href="/" className="btn btn-info btn-circle btn-sm">
										<i className="far fa-eye" />
									</a>
									<a href="/" className="btn btn-danger btn-circle btn-sm">
										<i className="fas fa-times" />
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default StockTable;
