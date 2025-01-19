import React from 'react';

const CartSidebar = ({ cart, removeFromCart }: { cart: any[], removeFromCart: (index: number) => void }) => {
  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="cartSidebar" aria-labelledby="cartSidebarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartSidebarLabel">Your Cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {cart.length > 0 ? (
          <ul className="list-group">
            {cart.map((item, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                {item.name} - ${item.price}
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;