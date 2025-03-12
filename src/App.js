import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import SymptomChecker from './components/SymptomChecker';
import Contact from './components/Contact';
import "./App.css";

function App() {
  return (
    <Router>
    <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<SymptomChecker />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
