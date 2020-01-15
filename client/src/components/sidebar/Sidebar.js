import React, { Component } from 'react';
import SidebarItem from './SidebarItem';
import { Link } from 'react-router-dom';
class Sidebar extends Component {
	state = {
		click: false,
		items: [
			// { name: 'home', label: 'Home' },
			{
				id: 'categories',
				label: 'Categories',
				icon: 'fas fa-fw fa-cog',
				items: [
					{ id: 'addNewCat', label: 'Add New Category', link: '/categories/new' },
					{ id: 'viewAllCat', label: 'View all Categories', link: '/categories' },
				],
			},
			{
				id: 'products',
				label: 'Products',
				icon: 'fas fa-fw fa-wrench',
				items: [
					{ id: 'addNewProduct', label: 'Add New Product', link: '/stocks/new' },
					{ id: 'viewAllProducts', label: 'View all Products', link: '/stocks' },
				],
			},
		],
	};
	handleClick = () => {
		this.setState({ click: !this.state.click });
	};
	render() {
		return (
			<div>
				{/* Sidebar */}
				<ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id='accordionSidebar'>
					{/* Sidebar - Brand */}
					<Link className='sidebar-brand d-flex align-items-center justify-content-center' to='/'>
						<div className='sidebar-brand-icon rotate-n-15'>
							<i className='fas fa-laugh-wink' />
						</div>
						<div className='sidebar-brand-text mx-3'>Hello Inventory </div>
					</Link>
					{/* Divider */}
					<hr className='sidebar-divider my-0' />
					{/* Nav Item - Dashboard */}
					<li className='nav-item active'>
						<Link className='nav-link' to='/'>
							<i className='fas fa-fw fa-tachometer-alt' />
							<span>Dashboard</span>
						</Link>
					</li>
					{/* Divider */}
					<hr className='sidebar-divider' />
					{/* Nav Item - Pages Collapse Menu */}
					<SidebarItem items={this.state.items} />
					{/* Nav Item - Utilities Collapse Menu */}
					<hr className='sidebar-divider my-0' />
					<div className='sidebar-heading'>Stock Details</div>
					<li className='nav-item'>
						<Link
							className='nav-link collapsed'
							to='/stocks'
							data-toggle
							data-target='#'
							aria-expanded='true'
							aria-controls='collapseUtilities'
						>
							<i className='fa fa-shopping-cart' />
							<span>In Stock</span>
						</Link>
					</li>
					{/* Divider */}
					<hr className='sidebar-divider' />
					{/* Sidebar Toggler (Sidebar) */}
					<div className='text-center d-none d-md-inline'>
						<button className='rounded-circle border-0' id='sidebarToggle' />
					</div>
				</ul>
				{/* End of Sidebar */}
			</div>
		);
	}
}

export default Sidebar;
