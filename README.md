# Portfólio de Bruno Rocha

Site estático em inglês e português, construído com HTML, CSS e JavaScript puro. Sem instalação, build, bibliotecas externas ou backend.

O seletor EN / PT no topo alterna o conteúdo sem recarregar a página. Inglês é o idioma inicial; a preferência é salva no navegador quando o armazenamento local está disponível. O currículo é o mesmo PDF nos dois idiomas. As traduções ficam em `js/i18n.js`, que deve ser carregado antes de `js/main.js`. Termos técnicos e nomes de tecnologias são preservados quando apropriado.

## Executar

Abra `index.html` diretamente no navegador. Todos os arquivos utilizam caminhos relativos, incluindo CSS, JavaScript, favicon e imagem de compartilhamento.

Para uma prévia HTTP local, se Python estiver instalado, execute na pasta do projeto:

```sh
python -m http.server 8080
```

Acesse `http://localhost:8080`. Encerre com Ctrl+C.

## Personalizar

Edite as constantes no começo de `js/main.js`:

```js
const PROFILE = {
  github: "https://github.com/SEU-USUARIO",
  linkedin: "https://www.linkedin.com/in/SEU-PERFIL/",
  email: "seu-email@exemplo.com",
  resume: "assets/Bruno-Rocha-Resume.pdf",
  photo: "assets/images/bruno-rocha.webp"
};
```

- GitHub, LinkedIn e email: substitua `null` pelos valores reais. Email deve conter apenas o endereço; `mailto:` é adicionado automaticamente.
- Currículo: adicione seu PDF em `assets/` e configure `PROFILE.resume` com o caminho relativo. O botão permite baixar o arquivo.
- Foto: opcional. Adicione uma imagem otimizada em `assets/images/` e configure `PROFILE.photo`. Ela aparece acima da apresentação. Deixe `null` para manter a composição sem foto.
- Projetos: preencha `github`, `demo` e `architecture` em cada entrada de `PROJECTS`. Sem URL de arquitetura, o botão abre um diálogo com a proposta arquitetural local. URLs externas abrem em nova aba com proteção `noopener noreferrer`.
- Links ausentes ficam sem destino, visualmente atenuados e com `aria-disabled`; nenhum perfil ou arquivo fictício é usado.
- Experiência: edite o conteúdo de `index.html`. Empresa, cargo detalhado e datas não foram inventados. Acrescente apenas informações públicas e verificáveis.
- Projetos são apresentados como conceitos e propostas, pois não foram fornecidas evidências sobre implementação ou publicação. Atualize essa indicação quando os repositórios estiverem disponíveis.
- Cores, tipografia, espaçamento, largura e bordas estão nas variáveis `:root` em `css/style.css`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie `index.html`, `css/`, `js/`, `assets/` e este README para a raiz da branch `main`.
2. No repositório, acesse **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta **/ (root)**. Salve.
5. Aguarde a publicação. O endereço normalmente será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`. Um repositório chamado `SEU-USUARIO.github.io` publica na raiz do domínio.

Os caminhos relativos funcionam também quando o site é servido dentro do nome do repositório. Nenhum roteamento de servidor é necessário.

## SEO e compartilhamento

O título, descrição e Open Graph ficam no `<head>` de `index.html`. Após publicar, adicione `og:url` e um link canonical com a URL real. A imagem SVG fornecida pode ser usada como referência visual; para maior compatibilidade com redes sociais, exporte `assets/images/social-preview.svg` como PNG de 1200 × 630 e substitua `og:image` por sua URL pública absoluta. Algumas plataformas não aceitam SVG para prévias.

## Acessibilidade e comportamento

HTML semântico, link para pular ao conteúdo, foco visível, menu móvel com estado acessível, navegação ativa, rolagem suave, diálogos com Escape e ano automático. As animações respeitam `prefers-reduced-motion`. O conteúdo permanece visível sem JavaScript; menu móvel, configuração de links e diálogos precisam de JavaScript.

## Estrutura

```text
index.html
css/style.css
js/main.js
js/i18n.js
assets/icons/favicon.svg
assets/images/social-preview.svg
README.md
```
