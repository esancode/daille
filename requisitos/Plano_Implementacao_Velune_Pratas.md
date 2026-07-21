# Plano de Implementação por Tarefas --- Velune Pratas

> Objetivo: seguir este documento do início ao fim até a loja estar
> publicada.

# Arquitetura

Um único projeto:

-   Next.js (site + painel administrativo)
-   Supabase (banco, autenticação e armazenamento)
-   Vercel (hospedagem)

Não haverá um projeto separado para sua irmã.

## Área da sua irmã

A área administrativa ficará em:

`/admin`

Ela fará login com e-mail e senha.

Após entrar verá:

-   Dashboard
-   Produtos
-   Novo Produto
-   Categorias
-   Configurações

Todo o gerenciamento acontecerá ali.

------------------------------------------------------------------------

# FASE 1 --- Planejamento

-   [ ] Criar repositório Git
-   [ ] Criar projeto Next.js
-   [ ] Configurar Tailwind
-   [ ] Configurar ESLint
-   [ ] Criar estrutura de pastas
-   [ ] Definir tema global

Entrega: Projeto rodando localmente.

------------------------------------------------------------------------

# FASE 2 --- Supabase

-   [ ] Criar projeto
-   [ ] Configurar variáveis de ambiente
-   [ ] Criar tabelas

## Tabela produtos

-   id
-   codigo
-   nome
-   descricao
-   preco
-   categoria
-   status
-   destaque
-   criado_em

## Tabela imagens

-   id
-   produto_id
-   url
-   ordem

## Tabela categorias

-   id
-   nome

Criar bucket: - produtos

Entrega: Banco pronto.

------------------------------------------------------------------------

# FASE 3 --- Design System

Criar componentes:

-   Botão
-   Card Produto
-   Input
-   Modal
-   Header
-   Footer
-   Badge
-   Carrinho lateral

Entrega: Biblioteca de componentes.

------------------------------------------------------------------------

# FASE 4 --- Loja

Ordem:

1 Home

2 Catálogo

3 Busca

4 Categorias

5 Produto

6 Carrinho

7 WhatsApp

Entrega: Fluxo completo do cliente.

------------------------------------------------------------------------

# FASE 5 --- Painel Administrativo

## Login

Somente administradora.

## Dashboard

Mostrar:

-   Total produtos
-   Disponíveis
-   Vendidos

## Produtos

Lista com:

Imagem

Nome

Preço

Status

Botões:

Editar

Marcar vendido

Excluir

## Novo Produto

Campos:

Nome

Descrição

Preço

Categoria

Fotos

Status

Destaque

Salvar

Fluxo:

Seleciona fotos

↓

Upload Supabase Storage

↓

URLs salvas

↓

Produto publicado imediatamente.

## Editar

Permitir alterar todos os campos.

## Marcar vendido

Não excluir.

Apenas mudar status.

Produto desaparece da loja.

## Excluir

Remoção definitiva.

Entrega: Sua irmã consegue administrar tudo sem ajuda.

------------------------------------------------------------------------

# FASE 6 --- WhatsApp

Produto individual:

Mensagem automática contendo nome, código e preço.

Carrinho:

Lista completa dos produtos.

Quantidade.

Valor total.

Mensagem educada solicitando atendimento.

------------------------------------------------------------------------

# FASE 7 --- Responsividade

Desktop

Tablet

Celular

------------------------------------------------------------------------

# FASE 8 --- SEO

Título

Descrição

OpenGraph

Ícones

Sitemap

Robots

------------------------------------------------------------------------

# FASE 9 --- Testes

Cadastrar produto

Editar

Excluir

Marcar vendido

Adicionar carrinho

Finalizar WhatsApp

Pesquisar

Responsividade

------------------------------------------------------------------------

# FASE 10 --- Deploy

Criar conta Vercel

Conectar GitHub

Adicionar variáveis

Deploy

Domínio

HTTPS

Teste final

------------------------------------------------------------------------

# Estrutura de pastas

app/ components/ features/ lib/ services/ hooks/ types/ supabase/
public/

------------------------------------------------------------------------

# Critério de conclusão

✔ Painel administrativo intuitivo

✔ Cadastro em menos de 1 minuto

✔ Upload de múltiplas imagens

✔ Carrinho funcionando

✔ WhatsApp funcionando

✔ Produtos vendidos ocultos

✔ Site responsivo

✔ Deploy realizado

✔ Domínio configurado

✔ Projeto pronto para uso real.
