import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para mostrar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Erro na requisição';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Funções helper para cada entidade
export const categoriaAPI = {
  listar: () => api.get('/categorias'),
  buscar: (id) => api.get(`/categorias/${id}`),
  criar: (data) => api.post('/categorias', data),
  atualizar: (id, data) => api.put(`/categorias/${id}`, data),
  deletar: (id) => api.delete(`/categorias/${id}`),
};

export const formaPagamentoAPI = {
  listar: () => api.get('/formas-pagamento'),
  buscar: (id) => api.get(`/formas-pagamento/${id}`),
  criar: (data) => api.post('/formas-pagamento', data),
  atualizar: (id, data) => api.put(`/formas-pagamento/${id}`, data),
  deletar: (id) => api.delete(`/formas-pagamento/${id}`),
};

export const despesaAPI = {
  listar: () => api.get('/despesas'),
  buscar: (id) => api.get(`/despesas/${id}`),
  criar: (data) => api.post('/despesas', data),
  atualizar: (id, data) => api.put(`/despesas/${id}`, data),
  deletar: (id) => api.delete(`/despesas/${id}`),
};

export const categoriaReceitaAPI = {
  listar: () => api.get('/categorias-receita'),
  buscar: (id) => api.get(`/categorias-receita/${id}`),
  criar: (data) => api.post('/categorias-receita', data),
  atualizar: (id, data) => api.put(`/categorias-receita/${id}`, data),
  deletar: (id) => api.delete(`/categorias-receita/${id}`),
};

export const formaRecebimentoAPI = {
  listar: () => api.get('/formas-recebimento'),
  buscar: (id) => api.get(`/formas-recebimento/${id}`),
  criar: (data) => api.post('/formas-recebimento', data),
  atualizar: (id, data) => api.put(`/formas-recebimento/${id}`, data),
  deletar: (id) => api.delete(`/formas-recebimento/${id}`),
};

export const receitaAPI = {
  listar: () => api.get('/receitas'),
  buscar: (id) => api.get(`/receitas/${id}`),
  criar: (data) => api.post('/receitas', data),
  atualizar: (id, data) => api.put(`/receitas/${id}`, data),
  deletar: (id) => api.delete(`/receitas/${id}`),
};

export const saldoAPI = {
  resumo: (dataInicio, dataFim) => 
    api.get(`/saldo/resumo?dataInicio=${dataInicio}&dataFim=${dataFim}`),
};

export default api;