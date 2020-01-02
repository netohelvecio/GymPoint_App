// FORMATAÇÃO NA MOEDA PR-BR
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
