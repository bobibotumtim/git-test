import { useCart } from "../contexts/CartContext";
import dishes from "../data/dishes";

const categoryIcons = {
  mains: "✦",
  appetizer: "◇",
  dessert: "●",
};

function DishesList() {
  const { addToCart, totalItems, totalValue } = useCart();

  return (
    <div className="menu-panel">
      <div className="menu-summary" aria-live="polite">
        <div>
          <span>Menu</span>
          <strong>{dishes.length} dishes</strong>
        </div>
        <div>
          <span>Live cart</span>
          <strong>
            {totalItems} {totalItems === 1 ? "item" : "items"} · ${totalValue.toFixed(2)}
          </strong>
        </div>
      </div>

      <div className="dish-grid">
        {dishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <div className={`dish-visual dish-visual--${dish.category}`}>
              <span aria-hidden="true">{categoryIcons[dish.category]}</span>
              <small>{dish.category}</small>
            </div>
            <div className="dish-card__content">
              <div className="dish-title-row">
                <h3>{dish.name}</h3>
                {dish.label && <span className="dish-label">{dish.label}</span>}
              </div>
              <p>{dish.description}</p>
              <div className="dish-card__footer">
                <strong>${dish.price}</strong>
                <button
                  type="button"
                  onClick={() => addToCart(dish)}
                  aria-label={`Add ${dish.name} to cart`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default DishesList;
