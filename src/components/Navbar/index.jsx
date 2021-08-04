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
		<NavLink to='#' activeStyle>
			Blaze
		</NavLink>
		<NavLink to='/Orders' activeStyle>
			Orders
		</NavLink>
		<NavLink to='/Products' activeStyle>
            Products
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
