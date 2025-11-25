import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saldoAPI } from '../services/api';

function Home() {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarResumo();
  }, []);

  const carregarResumo = async () => {
    try {
      const hoje = new Date();
      const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
      
      const dataInicio = primeiroDia.toISOString().split('T')[0];
      const dataFim = ultimoDia.toISOString().split('T')[0];

      const response = await saldoAPI.resumo(dataInicio, dataFim);
      setResumo(response.data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div>
      <div className="card">
        <h1 className="card-title"> Dashboard Financeiro</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Resumo do mês de {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </p>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Carregando resumo...</p>
          </div>
        ) : resumo ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '1.5rem', borderRadius: '12px', color: 'white' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}> Receitas</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                {formatarMoeda(resumo.totalReceitas)}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', padding: '1.5rem', borderRadius: '12px', color: 'white' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Despesas</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                {formatarMoeda(resumo.totalDespesas)}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', padding: '1.5rem', borderRadius: '12px', color: 'white' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}> Saldo</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                {formatarMoeda(resumo.saldo)}
              </div>
            </div>
          </div>
        ) : (
          <p>Sem dados disponíveis para este mês.</p>
        )}

        <h3 style={{ marginBottom: '1rem' }}>Ações Rápidas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Link to="/despesas" className="btn btn-danger">Gerenciar Despesas</Link>
          <Link to="/receitas" className="btn btn-success">Gerenciar Receitas</Link>
          <Link to="/categorias" className="btn btn-primary"> Categorias</Link>
          <Link to="/formas-pagamento" className="btn btn-secondary">Formas de Pagamento</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;