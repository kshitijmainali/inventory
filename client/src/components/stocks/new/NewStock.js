import React from 'react';

function NewStock() {
	return (
		<div>
			{/* DataTales Example */}
			<div className="card shadow mb-4">
				<div className="card-header py-3" style={{ position: 'relative' }}>
					<h6 className="m-0 font-weight-bold text-primary">Add New Item to Stock</h6>
				</div>
				<div className="card-body">
					<form>
						<div className="row">
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Product Code</label>
								<input type="text" className="form-control" placeholder="Product Code" />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Name</label>
								<input type="text" className="form-control" placeholder="Product Name" />
							</div>
						</div>
						<div className="row">
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Quantity</label>
								<input type="text" className="form-control" placeholder="Product Quantity" />
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="exampleInputEmail1">Rate</label>
								<input type="text" className="form-control" placeholder="Product Rate" />
							</div>
						</div>

						<button type="submit" className="btn btn-primary">
							Add Item
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default NewStock;
