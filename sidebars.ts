import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    "inicio",
    "desenvolvimento-web",
    "design",
    "geracao-conteudo",
    "gestao-projeto",
    "ferramentas",
    "heuristicas",
    {
      type: "category",
      label: "Conteúdos",
      collapsible: true,
      collapsed: true,
      link: {
        type: "generated-index",
        title: "Conteúdos de IHC",
        description:
          "Explore nossos guias rápidos sobre Interação Humano-Computador, pesquisa com usuários e avaliação de interfaces.",
        slug: "/conteudos",
      },
      items: [
        "conteudos/ux",
        "conteudos/personas",
        "conteudos/blueprint",
        "conteudos/design-empatico",
        "conteudos/usabilidade-ihc-acessibilidade",
      ],
    },
  ],
};

export default sidebars;
