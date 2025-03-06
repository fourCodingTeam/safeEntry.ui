# safeEntry.ui

### Estrutura

1. App: Concentra a base do projeto, desde as páginas até o arquivo de layout principal;
2. Assets: Concentra quaisquer arquivos de imagem/áudio ou afins necessários para o projeto, deixei apenas os que precisaremos substituir no "app.json";
3. Components: Como o próprio nome diz, separa a pasta de componentes do projeto, vinda de uma trend recente de componentizar projetos, ou seja, em vez de desenvolver todos em um lugar apenas, separamos em partes para facilitar a manutenção.
4. Components -> UI: Parte menor dos componentes, responsável pela concentração de componentes como "Botões", "Formulários" e outros que serão utilizados em múltiplas partes do projeto;
5. Components -> Layout: Parte maior dos componentes, é aqui que montamos as páginas base - com os componentes usados no diretório "ui" - antes de juntá-las no "app";
6. Constants: Responsável por concentrar constantes do app, como cores, tamanhos, fontes, estilos, etc;
7. Contexts: Responsável por agrupar os contextos do aplicativo, como dados do usuários necessários em múltiplas páginas ou informações NÃO SENSÍVEIS trazidas em requisições que precisam ser armazenadas para outros fins;
8. i18n: Responsável por concentrar a tradução do aplicativo. Começaremos usando apenas Inglês e Português;
9. Services: concentra as chamadas aos serviços de api da aplicação backend do nosso projeto, usaremos Axios para fazer as requisições.

---

### Tecnologias

1. StyledComponents: responsável pela criação de componentes css para melhor reutilização de código, exemplo abaixo.

export const StyledExample = styled.div´
  display:flex;
`

2. Axios: usaremos para fazer as requisições de dados.