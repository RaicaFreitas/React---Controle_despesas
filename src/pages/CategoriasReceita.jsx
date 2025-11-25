import React from 'react';
import Crud from '../components/Crud';
import { categoriaReceitaAPI } from '../services/api';

function CategoriasReceita() {
  const campos = [
    { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    { nome: 'descricao', label: 'Descrição', tipo: 'textarea', obrigatorio: false },
    { nome: 'ativo', label: 'Ativo', tipo: 'checkbox', obrigatorio: false },
  ];

  return (
    <Crud
      titulo="Categorias de Receitas"
      api={categoriaReceitaAPI}
      campos={campos}
      campoId="idCategoriaReceita"
    />
  );
}

export default CategoriasReceita;











