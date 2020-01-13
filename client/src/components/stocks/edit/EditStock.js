import React from 'react';

function EditStock(props) {
	const data = props.location.state;
	console.log(data);
	return (
		<div>
			{/* DataTales Example */}
			<div className="card shadow mb-4">
				<div className="card-header py-3" style={{ position: 'relative' }}>
					<h6 className="m-0 font-weight-bold text-primary">Update Item to Stock</h6>
				</div>
				<div className="card-body">
					<form>
						<div className="row">
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Product Code</label>
								<input
									type="text"
									className="form-control"
									placeholder="Product Code"
									value={data.productCode}
								/>
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Name</label>
								<input
									type="text"
									className="form-control"
									placeholder="Product Name"
									value={data.productName}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Quantity</label>
								<input
									type="text"
									className="form-control"
									placeholder="Product Quantity"
									value={data.quantity}
								/>
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Rate</label>
								<input
									type="text"
									className="form-control"
									placeholder="Product Rate"
									value={data.rate}
								/>
							</div>
						</div>

						<button type="submit" className="btn btn-primary">
							Update Item
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default EditStock;
