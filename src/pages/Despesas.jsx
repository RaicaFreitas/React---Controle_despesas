import React from 'react';
import Crud from '../components/Crud';
import { despesaAPI, categoriaAPI, formaPagamentoAPI } from '../services/api';

function Despesas() {
  const campos = [
    { nome: 'descricao', label: 'Descrição', tipo: 'text', obrigatorio: true },
    { nome: 'valor', label: 'Valor', tipo: 'number', obrigatorio: true, formato: 'moeda' },
    { nome: 'dataDespesa', label: 'Data', tipo: 'date', obrigatorio: true },
    { 
      nome: 'categoria', 
      label: 'Categoria', 
      tipo: 'select', 
      obrigatorio: true,
      apiOpcoes: categoriaAPI,
      campoIdRelacionado: 'idCategoria',
      campoLabelRelacionado: 'nome'
    },
    { 
      nome: 'formaPagamento', 
      label: 'Forma de Pagamento', 
      tipo: 'select', 
      obrigatorio: true,
      apiOpcoes: formaPagamentoAPI,
      campoIdRelacionado: 'idFormaPagamento',
      campoLabelRelacionado: 'nome'
    },
    { nome: 'observacao', label: 'Observação', tipo: 'textarea', obrigatorio: false, mostrarNaLista: false },
  ];

  return (
    <Crud
      titulo="Despesas"
      api={despesaAPI}
      campos={campos}
      campoId="idDespesa"
    />
  );
}

export default Despesas;