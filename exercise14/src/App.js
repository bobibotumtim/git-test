import Cart from "./components/Cart";
import DishesList from "./components/DishesList";
import ThemeDemo from "./components/ThemeDemo";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">FER202 / Exercise 14</p>
          <h1>Sharing state with useContext</h1>
        </div>
        <p>
          Context lets distant components read the same state and actions
          without forwarding props through every level of the tree.
        </p>
      </header>

      <section className="context-section">
        <div className="section-heading">
          <span>01</span>
          <div>
            <h2>Theme context</h2>
            <p>One provider controls the foreground and background theme.</p>
          </div>
        </div>
        <ThemeProvider>
          <ThemeDemo />
        </ThemeProvider>
      </section>

      <section className="context-section">
        <div className="section-heading">
          <span>02</span>
          <div>
            <h2>Cart context</h2>
            <p>
              The menu and cart consume the same live count, items, and total
              value.
            </p>
          </div>
        </div>
        <CartProvider>
          <div className="shop-layout">
            <DishesList />
            <Cart />
          </div>
        </CartProvider>
      </section>
    </main>
  );
}

export default App;
