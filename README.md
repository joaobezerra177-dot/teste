# Harmonette — prévia visual 0.1

Projeto local feito apenas com **HTML, CSS, JavaScript e JSON**. Não usa Node.js, Express, PostgreSQL ou outro backend.

## Como visualizar no VS Code
1. Extraia a pasta do ZIP.
2. Abra a pasta `harmonette-visualizacao` no VS Code.
3. Abra o arquivo `index.html` no navegador. Se tiver a extensão Live Server, clique com o botão direito em `index.html` e escolha **Open with Live Server**.

## O que dá para testar
- Navegar pelas telas Visão geral, Minhas aulas, Alunos, Atividades e Materiais musicais.
- Pesquisar aulas e alunos de exemplo.
- Criar uma aula de demonstração. Ela fica salva no `localStorage` do navegador.

## Estrutura
- `index.html`: páginas/telas da prévia.
- `css/style.css`: estilos e responsividade.
- `js/app.js`: navegação e interações.
- `dados/exemplo.json`: dados fictícios para referência.
- `assets/`: reservado para imagens e ícones futuros.

## Limites desta prévia
O JSON é um arquivo de exemplo; uma página HTML não consegue gravar nele diretamente por segurança do navegador. A criação de aulas salva dados apenas no navegador atual (`localStorage`). Ainda não há contas reais, sincronização entre dispositivos, upload funcional ou banco de dados compartilhado.
