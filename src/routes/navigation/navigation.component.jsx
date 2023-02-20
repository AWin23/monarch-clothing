import { Fragment, useContext } from 'react';
import {Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-drowndown.component';



import {UserContext} from '../../contexts/user.context';
import {CartContext} from '../../contexts/cart.context';

import {signOutUser} from '../../utils/firebase/firebase.utils'

import {ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  //  console.log(currentUser);

    return(
      <Fragment>
        <div className='navigation'>
        <Link className='logo-container' to='/'>
        <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'></div>
        <Link className='nav-link' to='/shop'>
        SHOP
        </Link>


        {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
            SIGN OUT 
            </span>
            ) : (
              <Link className='nav-link' to='/auth'>
        SIGN-IN
        </Link>
          )}
          <CartIcon />
      </div>
     { isCartOpen && <CartDropdown />}
      <Outlet />
      </Fragment>
    );
  };

  export default Navigation;