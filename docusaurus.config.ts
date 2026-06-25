import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "IHC 2026.1 - Grupo 01",
  tagline: "Guia de Acessibilidade e Usabilidade: Desenvolvimento Web",
  favicon: "img/favicon.ico",

  onBrokenLinks: "throw",
  onBrokenAnchors: "ignore",

  future: {
    v4: true,
  },

  url: "https://unb-ihc.github.io",
  baseUrl: "/IHC_2026.1_Grupo01/",
  trailingSlash: false,

  organizationName: "UnB-IHC",
  projectName: "IHC_2026.1_Grupo01",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // ← Importante
          editUrl: "https://github.com/UnB-IHC/IHC_2026.1_Grupo01/tree/main/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/UnB-IHC/IHC_2026.1_Grupo01/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "IHC 2026.1 - Grupo 01",
      logo: {
        alt: "IHC Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://github.com/UnB-IHC/IHC_2026.1_Grupo01",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentação",
          items: [
            { label: "Início", to: "/inicio" },
            { label: "Desenvolvimento Web", to: "/desenvolvimento-web" },
            { label: "Design", to: "/design" },
            { label: "Geração de Conteúdo", to: "/geracao-conteudo" },
            { label: "Gestão do Projeto", to: "/gestao-projeto" },
            { label: "Ferramentas", to: "/ferramentas" },
          ],
        },
        {
          title: "Comunidade",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/UnB-IHC/IHC_2026.1_Grupo01",
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
