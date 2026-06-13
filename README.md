# 🎯 IHC 2026.1 - Grupo 01: Guia de Acessibilidade e Usabilidade em Desenvolvimento Web

Documentação educacional sobre **acessibilidade digital**, **usabilidade** e **boas práticas em desenvolvimento web**, desenvolvida como trabalho final da disciplina de **Interação Humano-Computador (IHC)** da Universidade de Brasília, semestre 2026.1.

## 📚 Sobre este Projeto

Este repositório contém uma **documentação interativa** que reúne conhecimentos sobre:

- **10 Heurísticas de Usabilidade de Nielsen** — princípios gerais para avaliar e guiar decisões de design
- **Acessibilidade Digital (WCAG 2.2)** — normas e critérios para tornar interfaces acessíveis a todas as pessoas
- **Padrões de Design** — convenções e padrões reutilizáveis para interfaces acessíveis
- **Desenvolvimento Web Acessível** — técnicas, ferramentas e boas práticas
- **Gestão de Acessibilidade em Projetos** — processos e metodologias
- **Geração de Conteúdo Acessível** — criação de textos, imagens, vídeos e áudios inclusivos
- **Ferramentas e Recursos** — instrumentos para testes, validação e aprendizado

### 🎓 Contexto Educacional

Este é um trabalho em grupo desenvolvido para avaliar competências em:

- Pesquisa e síntese de informações sobre acessibilidade
- Documentação técnica clara e bem estruturada
- Comunicação de conhecimento complexo
- Avaliação de usabilidade em interfaces digitais

---

## 🚀 Como Usar Esta Documentação

### Versão Online

Acesse a documentação publicada em: **[https://unb-ihc.github.io](https://unb-ihc.github.io)**

### Localmente

#### Pré-requisitos

- Node.js 18+
- Yarn ou npm

#### Instalação

```bash
# Clone o repositório
git clone https://github.com/UnB-IHC/IHC_2026.1_Grupo01.git
cd IHC_2026.1_Grupo01

# Instale as dependências
yarn
```

#### Desenvolvimento

```bash
yarn start
```

Isso inicia um servidor local em `http://localhost:3000` com hot reload. Alterações no código são refletidas em tempo real.

#### Build para Produção

```bash
yarn build
```

Gera arquivos estáticos na pasta `build/` prontos para deployment.

---

## 📖 Estrutura da Documentação

```
docs/
├── inicio.mdx                    # Página inicial e contexto do trabalho
├── heuristicas.mdx              # 10 Heurísticas de Nielsen com checklist interativo
├── design.mdx                   # Princípios de design e padrões visuais acessíveis
├── desenvolvimento-web.mdx      # Boas práticas em HTML, CSS, JavaScript acessível
├── gestao-projeto.mdx           # Processos de gestão e inclusão de acessibilidade
├── geracao-conteudo.mdx         # Criação de conteúdo acessível (texto, mídia)
└── ferramentas.mdx              # Recursos, ferramentas e referências
```

---

## 👥 Como Contribuir (Grupo 01)

Este repositório é **colaborativo**. Cada membro do grupo é responsável por preencher e manter certas seções:

### Fluxo de Contribuição

1. **Crie uma branch** para sua atividade

   ```bash
   git checkout -b feature/secao-acessibilidade
   ```

2. **Preencha o template** na respectiva `.mdx`
   - Procure por `[PREENCHER ...]` para saber onde adicionar conteúdo
   - Siga as instruções comentadas em cada página

3. **Teste localmente**

   ```bash
   yarn start
   ```

4. **Faça commit e push**

   ```bash
   git add .
   git commit -m "Adiciona conteúdo sobre [tema]"
   git push origin feature/secao-acessibilidade
   ```

5. **Abra um Pull Request** e solicite revisão dos colegas

### ✨ Boas Práticas

- ✅ Escreva em **português claro e acessível**
- ✅ Valide **links** antes de fazer commit
- ✅ Teste a **acessibilidade** da sua contribuição
- ✅ Verifique **formatação Markdown** (sem erros de sintaxe)

---

## 🔍 Tecnologias Utilizadas

- **[Docusaurus 3.x](https://docusaurus.io/)** — gerador de documentação estática
- **[React](https://react.dev/)** — componentes interativos
- **[TypeScript](https://www.typescriptlang.org/)** — tipagem segura
- **[Recharts](https://recharts.org/)** — visualizações de dados (gráficos de progresso)
- **[Markdown + MDX](https://mdxjs.com/)** — conteúdo com componentes React embutidos

---

## 📞 Suporte e Dúvidas

- **Dúvidas sobre conteúdo?** Abra uma [Issue](https://github.com/UnB-IHC/IHC_2026.1_Grupo01/issues) ou discuta com o grupo
- **Erro técnico?** Verifique a [Documentação do Docusaurus](https://docusaurus.io/docs)
- **Sobre acessibilidade?** Consulte [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) e [Nielsen Norman Group](https://www.nngroup.com/articles/ten-usability-heuristics/)
