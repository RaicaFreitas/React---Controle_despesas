import React from 'react';
import Crud from '../components/Crud';
import { formaRecebimentoAPI } from '../services/api';

function FormasRecebimento() {
  const campos = [
    { nome: 'nome', label: 'Nome', tipo: 'text', obrigatorio: true },
    { nome: 'descricao', label: 'Descrição', tipo: 'textarea', obrigatorio: false },
    { nome: 'ativo', label: 'Ativo', tipo: 'checkbox', obrigatorio: false },
  ];

  return (
    <Crud
      titulo="Formas de Recebimento"
      api={formaRecebimentoAPI}
      campos={campos}
      campoId="idFormaRecebimento"
    />
  );
}

export default FormasRecebimento;