import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      < Headers />
      < HeroBanner />
      < ProductList />
      < Footer />
    </div>
  );
}

export default App;
