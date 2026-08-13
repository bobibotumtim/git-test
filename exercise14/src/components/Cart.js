import { useCart } from "../contexts/CartContext";

function Cart() {
  const {
    cartItems,
    totalItems,
    totalValue,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <aside className="cart-panel">
      <div className="cart-heading">
        <div>
          <span>Your order</span>
          <h3>Cart</h3>
        </div>
        <span className="cart-count" aria-label={`${totalItems} items in cart`}>
          {totalItems}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <span aria-hidden="true">＋</span>
          <p>Your cart is empty.</p>
          <small>Add a dish from the menu to begin.</small>
        </div>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} × ${Number(item.price).toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total" aria-live="polite">
        <span>Total value</span>
        <strong>${totalValue.toFixed(2)}</strong>
      </div>
      <button
        className="clear-cart"
        type="button"
        onClick={clearCart}
        disabled={cartItems.length === 0}
      >
        Clear cart
      </button>
    </aside>
  );
}

export default Cart;
