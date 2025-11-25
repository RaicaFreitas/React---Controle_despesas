import React from 'react';
import Crud from '../components/Crud';
import { receitaAPI, categoriaReceitaAPI, formaRecebimentoAPI } from '../services/api';

function Receitas() {
  const campos = [
    { nome: 'descricao', label: 'Descrição', tipo: 'text', obrigatorio: true },
    { nome: 'valor', label: 'Valor', tipo: 'number', obrigatorio: true, formato: 'moeda' },
    { nome: 'dataReceita', label: 'Data', tipo: 'date', obrigatorio: true },
    { 
      nome: 'categoriaReceita', 
      label: 'Categoria', 
      tipo: 'select', 
      obrigatorio: true,
      apiOpcoes: categoriaReceitaAPI,
      campoIdRelacionado: 'idCategoriaReceita',
      campoLabelRelacionado: 'nome'
    },
    { 
      nome: 'formaRecebimento', 
      label: 'Forma de Recebimento', 
      tipo: 'select', 
      obrigatorio: true,
      apiOpcoes: formaRecebimentoAPI,
      campoIdRelacionado: 'idFormaRecebimento',
      campoLabelRelacionado: 'nome'
    },
    { nome: 'recorrente', label: 'Recorrente', tipo: 'checkbox', obrigatorio: false, mostrarNaLista: false },
    { nome: 'observacao', label: 'Observação', tipo: 'textarea', obrigatorio: false, mostrarNaLista: false },
  ];

  return (
    <Crud
      titulo="Receitas"
      api={receitaAPI}
      campos={campos}
      campoId="idReceita"
    />
  );
}

export default Receitas;