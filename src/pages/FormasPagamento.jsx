import React from 'react';
import Crud from '../components/Crud';
import { formaPagamentoAPI } from '../services/api';

function FormasPagamento() {
  const campos = [
    { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    { nome: 'descricao', label: 'Descrição', tipo: 'textarea', obrigatorio: false },
    { nome: 'ativo', label: 'Ativo', tipo: 'checkbox', obrigatorio: false },
  ];

  return (
    <Crud
      titulo="Formas de Pagamento"
      api={formaPagamentoAPI}
      campos={campos}
      campoId="idFormaPagamento"
    />
  );
}

export default FormasPagamento;