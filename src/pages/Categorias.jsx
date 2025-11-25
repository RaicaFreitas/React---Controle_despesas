import React from 'react';
import Crud from '../components/Crud';
import { categoriaAPI } from '../services/api';

function Categorias() {
  const campos = [
    { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    { nome: 'descricao', label: 'Descrição', tipo: 'textarea', obrigatorio: false },
    { nome: 'ativo', label: 'Ativo', tipo: 'checkbox', obrigatorio: false },
  ];

  return (
    <Crud
      titulo="Categorias de Despesas"
      api={categoriaAPI}
      campos={campos}
      campoId="idCategoria"
    />
  );
}

export default Categorias;