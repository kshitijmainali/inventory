import React from 'react';
import { Link } from 'react-router-dom';

function SidebarItem({ items }) {
	return items.map((item, i) => (
		<li key={i} className='nav-item'>
			<Link
				to={item.link}
				className='nav-link collapsed'
				data-toggle={!item.link && 'collapse'}
				data-target={`#${item.id}`}
				aria-expanded='true'
				aria-controls={item.id}
			>
				<i className={item.icon} />
				<span>{item.label}</span>
			</Link>
			{!item.link && (
				<div id={item.id} className='collapse' aria-labelledby='headingTwo' data-parent='#accordionSidebar'>
					<div className='bg-white py-2 collapse-inner rounded'>
						{/*<h6 class="collapse-header">Custom Components:</h6>*/}
						{item.items.map((subItem, i) => (
							<Link key={i} className='collapse-item' to={subItem.link}>
								{subItem.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</li>
	));
}

export default SidebarItem;
