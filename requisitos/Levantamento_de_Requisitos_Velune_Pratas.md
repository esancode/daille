# Levantamento de Requisitos de Software
# Projeto: Velune Pratas

## Objetivo
Criar uma loja virtual simples para exposição de joias em Prata 925, sem checkout. A venda será concluída pelo WhatsApp.

## Identidade Visual
- Marca: Velune Pratas
- Estilo: premium, minimalista
- Cores:
  - Preto profundo (#111111)
  - Branco
  - Prata metálico
  - Champagne
  - Azul marinho escuro (cor terciária para destaques, botões e links)

## Público
Clientes que desejam visualizar o catálogo e comprar pelo WhatsApp.

# Requisitos Funcionais

## Catálogo
- Listar produtos em grade.
- Busca por nome.
- Filtros por categoria.
- Produtos em destaque.
- Exibir indisponíveis opcionalmente.

## Produto
Cada produto deve possuir:
- Nome
- Código
- Preço
- Descrição
- Categoria
- Peso (opcional)
- Material: Prata 925
- Fotos (múltiplas)
- Status (Disponível/Indisponível)

Botões:
- Comprar pelo WhatsApp
- Adicionar ao carrinho

Mensagem automática:
"Olá! Tenho interesse no produto: {Nome} (Código: {Código})."

## Carrinho
- Adicionar/remover produtos.
- Alterar quantidade.
- Resumo.
- Finalizar via WhatsApp.

Mensagem:
Olá! Tenho interesse nos seguintes produtos:

- Produto A x2
- Produto B x1

Total estimado: R$ XX,XX

Gostaria de finalizar minha compra.

## Painel Administrativo

### Login simples

### Dashboard
- Total de produtos
- Produtos disponíveis
- Produtos indisponíveis

### Cadastro
- Formulário intuitivo
- Arrastar fotos
- Pré-visualização
- Salvar

### Edição
- Editar qualquer campo.

### Exclusão
- Remover definitivamente.
- Marcar como vendido.

### Organização
- Categorias
- Ordenação

## Não Funcionais
- Responsivo
- SEO básico
- Carregamento rápido
- Interface intuitiva
- Fácil manutenção

## Estrutura

- Home
- Catálogo
- Produto
- Carrinho
- Sobre
- Contato
- Painel Admin

## Tecnologias sugeridas

Frontend:
- Next.js
- TailwindCSS

Backend:
- Supabase

Storage:
- Supabase Storage

Hospedagem:
- Vercel

## Futuras melhorias
- Pagamento online
- Pix automático
- Frete
- Login de clientes
- Favoritos
- Avaliações
- Cupons
- Dashboard de vendas

## Critério principal
A irmã da proprietária deve conseguir cadastrar, editar e remover produtos sem conhecimento técnico, em poucos cliques.
