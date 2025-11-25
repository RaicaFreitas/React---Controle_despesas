import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import FormasPagamento from './pages/FormasPagamento';
import Despesas from './pages/Despesas';
import CategoriasReceita from './pages/CategoriasReceita';
import FormasRecebimento from './pages/FormasRecebimento';
import Receitas from './pages/Receitas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo"> Controle Financeiro</Link>
            <ul className="nav-menu">
              <li><Link to="/">Home</Link></li>
              <li className="dropdown">
                <span> Categorias</span>
                <ul className="dropdown-menu">
                  <li><Link to="/categorias">Despesas</Link></li>
                  <li><Link to="/categorias-receita">Receitas</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <span> Formas</span>
                <ul className="dropdown-menu">
                  <li><Link to="/formas-pagamento">Pagamento</Link></li>
                  <li><Link to="/formas-recebimento">Recebimento</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <span> Movimentações</span>
                <ul className="dropdown-menu">
                  <li><Link to="/despesas">Despesas</Link></li>
                  <li><Link to="/receitas">Receitas</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/formas-pagamento" element={<FormasPagamento />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/categorias-receita" element={<CategoriasReceita />} />
            <Route path="/formas-recebimento" element={<FormasRecebimento />} />
            <Route path="/receitas" element={<Receitas />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 Controle Financeiro</p>
        </footer>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;