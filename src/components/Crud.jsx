import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Crud({ titulo, api, campos, campoId }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectOptions, setSelectOptions] = useState({});

  useEffect(() => {
    carregarDados();
    carregarOpcoesSelect();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const response = await api.listar();
      setDados(response.data);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const carregarOpcoesSelect = async () => {
    const opcoes = {};
    for (const campo of campos) {
      if (campo.tipo === 'select' && campo.apiOpcoes) {
        try {
          const response = await campo.apiOpcoes.listar();
          opcoes[campo.nome] = response.data;
        } catch (error) {
          console.error(`Erro ao carregar opções de ${campo.nome}:`, error);
        }
      }
    }
    setSelectOptions(opcoes);
  };

  const abrirModalNovo = () => {
    setModoEdicao(false);
    setItemSelecionado(null);
    const initialData = {};
    campos.forEach(campo => {
      if (campo.tipo === 'checkbox') {
        initialData[campo.nome] = true;
      } else if (campo.tipo === 'select') {
        initialData[campo.nome] = { [campo.campoIdRelacionado]: '' };
      } else {
        initialData[campo.nome] = '';
      }
    });
    setFormData(initialData);
    setModalAberto(true);
  };

  const abrirModalEditar = (item) => {
    setModoEdicao(true);
    setItemSelecionado(item);
    const data = {};
    campos.forEach(campo => {
      if (campo.tipo === 'select') {
        data[campo.nome] = item[campo.nome] || { [campo.campoIdRelacionado]: '' };
      } else {
        data[campo.nome] = item[campo.nome] || '';
      }
    });
    setFormData(data);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFormData({});
    setItemSelecionado(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicao) {
        await api.atualizar(itemSelecionado[campoId], formData);
        toast.success('Atualizado com sucesso!');
      } else {
        await api.criar(formData);
        toast.success('Criado com sucesso!');
      }
      fecharModal();
      carregarDados();
    } catch (error) {
      toast.error('Erro ao salvar');
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      try {
        await api.deletar(id);
        toast.success('Deletado com sucesso!');
        carregarDados();
      } catch (error) {
        toast.error('Erro ao deletar');
      }
    }
  };

  const renderCampoFormulario = (campo) => {
    if (campo.tipo === 'select') {
      return (
        <select
          name={`${campo.nome}.${campo.campoIdRelacionado}`}
          value={formData[campo.nome]?.[campo.campoIdRelacionado] || ''}
          onChange={handleChange}
          className="form-control"
          required={campo.obrigatorio}
        >
          <option value="">Selecione...</option>
          {selectOptions[campo.nome]?.map(opcao => (
            <option key={opcao[campo.campoIdRelacionado]} value={opcao[campo.campoIdRelacionado]}>
              {opcao[campo.campoLabelRelacionado]}
            </option>
          ))}
        </select>
      );
    }

    if (campo.tipo === 'textarea') {
      return (
        <textarea
          name={campo.nome}
          value={formData[campo.nome] || ''}
          onChange={handleChange}
          className="form-control"
          rows="3"
          required={campo.obrigatorio}
        />
      );
    }

    if (campo.tipo === 'checkbox') {
      return (
        <input
          type="checkbox"
          name={campo.nome}
          checked={formData[campo.nome] || false}
          onChange={handleChange}
          style={{ width: 'auto', marginLeft: '0.5rem' }}
        />
      );
    }

    return (
      <input
        type={campo.tipo || 'text'}
        name={campo.nome}
        value={formData[campo.nome] || ''}
        onChange={handleChange}
        className="form-control"
        required={campo.obrigatorio}
      />
    );
  };

  const renderValorCelula = (item, campo) => {
    if (campo.tipo === 'checkbox') {
      return item[campo.nome] ? ' Ativo' : ' Inativo';
    }
    if (campo.tipo === 'select') {
      return item[campo.nome]?.[campo.campoLabelRelacionado] || '-';
    }
    if (campo.tipo === 'date') {
      return item[campo.nome] ? new Date(item[campo.nome] + 'T00:00:00').toLocaleDateString('pt-BR') : '-';
    }
    if (campo.tipo === 'number' && campo.formato === 'moeda') {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item[campo.nome]);
    }
    return item[campo.nome] || '-';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="flex justify-between mb-2">
          <h1 className="card-title">{titulo}</h1>
          <button className="btn btn-primary" onClick={abrirModalNovo}>
             Novo
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {campos.filter(c => c.mostrarNaLista !== false).map((campo) => (
                  <th key={campo.nome}>{campo.label}</th>
                ))}
                <th style={{ width: '150px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dados.length === 0 ? (
                <tr>
                  <td colSpan={campos.filter(c => c.mostrarNaLista !== false).length + 1} className="text-center">
                    Nenhum registro encontrado
                  </td>
                </tr>
              ) : (
                dados.map((item) => (
                  <tr key={item[campoId]}>
                    {campos.filter(c => c.mostrarNaLista !== false).map((campo) => (
                      <td key={campo.nome}>{renderValorCelula(item, campo)}</td>
                    ))}
                    <td>
                      <button
                        className="btn btn-secondary btn-small"
                        onClick={() => abrirModalEditar(item)}
                        style={{ marginRight: '0.5rem' }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDeletar(item[campoId])}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {modoEdicao ? `Editar ${titulo}` : `Novo ${titulo}`}
              </h2>
              <button className="modal-close" onClick={fecharModal}>✖️</button>
            </div>

            <form onSubmit={handleSubmit}>
              {campos.map((campo) => (
                <div key={campo.nome} className="form-group">
                  <label className="form-label">
                    {campo.label}
                    {campo.obrigatorio && <span style={{ color: 'red' }}> *</span>}
                  </label>
                  {renderCampoFormulario(campo)}
                </div>
              ))}

              <div className="flex gap-1" style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                  Salvar
                </button>
                <button type="button" className="btn btn-secondary" onClick={fecharModal} style={{ flex: 1 }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Crud;
