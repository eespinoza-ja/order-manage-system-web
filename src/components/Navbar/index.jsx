import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='#'>
			Blaze
		</NavLink>
		<NavLink to='/Orders'>
			Orders
		</NavLink>
		<NavLink to='/Products'>
            Products
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
