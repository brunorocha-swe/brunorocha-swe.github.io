# Portfólio de Bruno Rocha

Site estático em inglês e português, com HTML, CSS e JavaScript puro. Sem instalação, build ou backend.

Site: https://brunorocha-swe.github.io/

## Executar e publicar

Abra `index.html` no navegador. Os caminhos são relativos. Para uma prévia HTTP opcional, execute `python -m http.server 8080` e abra `http://localhost:8080`.

O repositório `brunorocha-swe/brunorocha-swe.github.io` publica automaticamente a branch `main`, pasta `/ (root)`, pelo GitHub Pages. O arquivo `.nojekyll` mantém os arquivos estáticos.

```sh
git add index.html css js assets README.md .nojekyll
git commit -m "Update portfolio"
git push origin main
```

Em um novo repositório, configure **Settings → Pages → Deploy from a branch → main → / (root)** e ajuste canonical, `og:url` e URLs absolutas de compartilhamento.

## Personalizar

- `js/main.js`: `PROFILE.github`, `PROFILE.linkedin`, `PROFILE.resume` e `PROFILE.photo`. A foto é opcional; coloque uma imagem otimizada em `assets/images/` ou mantenha `null`.
- `assets/Bruno-Rocha-Resume.pdf`: currículo em inglês usado nos dois idiomas. Substitua o arquivo para atualizar o download.
- `index.html`: experiência, tecnologias, conteúdo e links do projeto. Não adicione botões sem destinos reais.
- `js/i18n.js`: traduções EN/PT, incluindo acessibilidade e imagens. Ao alterar textos em inglês, atualize as chaves e traduções. Carregue antes de `main.js`.
- `css/style.css`: variáveis de cor, tipografia, espaçamento, bordas e largura em `:root`, além das regras responsivas.
- O contato usa LinkedIn, sem formulário ou link de email sem configuração.

O seletor EN/PT salva a preferência quando o armazenamento local está disponível. Sem JavaScript, o conteúdo permanece em inglês; a configuração dinâmica de links e o menu móvel exigem JavaScript.

## Conteúdo e evidências

A experiência segue o currículo fornecido: PerformaIT/Pague Menos, Onset Tecnologia/Compnet e Distrito. 22M+ refere-se aos clientes ativos da plataforma de varejo; até 90% refere-se à redução de requisições downstream em endpoints críticos; 40–80% refere-se ao tempo de carregamento de telas críticas. Esses resultados não são métricas do projeto pessoal.

O projeto em destaque é [Order-Processing-Platform](https://github.com/brunorocha-swe/Order-Processing-Platform). A descrição foi conferida com o README público em 18/10/2026. O screenshot `assets/images/order-trace.png` foi obtido de `docs/images/order-trace.png` desse repositório, sob licença MIT. Mostra uma demonstração local real com pedidos fictícios e pagamentos simulados, sem alegações de uso em produção ou testes de carga. O projeto implementa outbox próprio, inbox, saga com compensação, retries limitados, DLQ e OpenTelemetry; não se atribui MassTransit ou Redis a ele.

Smart Wishlist e Building Access Management foram removidos da vitrine enquanto não há implementações verificadas para apresentar. A stack se baseia no currículo, no contexto profissional fornecido e no projeto público, sem níveis de domínio presumidos.

## Compartilhamento e acessibilidade

`assets/images/social-preview.png` tem 1200 × 630 pixels. Open Graph e Twitter Card usam sua URL HTTPS absoluta. O SVG é a fonte gráfica; após editá-lo, exporte novamente o PNG.

HTML semântico, foco visível, navegação ativa, menu com estado acessível e respeito a `prefers-reduced-motion`. As imagens têm dimensões explícitas; o trace da seção de projetos usa carregamento tardio.
