# Site da Fundação Filiço Teixeira

Site institucional da **Fundação Associação dos Amigos de Lagoa do Piauí – Fundação Filiço Teixeira**,
entidade sem fins lucrativos de Lagoa do Piauí – PI.

É um site estático de uma página só: HTML, CSS e JavaScript puros, sem build e sem dependências.

## Estrutura

```
index.html       Estrutura e conteúdo de todas as seções
css/style.css    Todo o visual (cores, layout, responsivo)
js/main.js       Menu mobile, animações, galeria e formulário de contato
*.jpg, *.png     Fotos da galeria e logo
```

## Como editar

| Quero mudar…                         | Onde                                                     |
|--------------------------------------|----------------------------------------------------------|
| Textos, projetos, certificações      | `index.html`, na seção correspondente (`id="projetos"` etc.) |
| Cores do site                        | `css/style.css`, variáveis no início (`:root`)           |
| E-mail que recebe o formulário       | `js/main.js`, constante `EMAIL_CONTATO`                  |
| Fotos da galeria                     | `index.html`, seção `id="galeria"`                       |

### Adicionando fotos

Antes de subir uma foto, reduza para no máximo **1600 px** de largura (fotos de celular costumam ter
mais de 4000 px e 5 MB, o que deixa o site lento em internet móvel). Na galeria, cada foto deve ter
um `alt` descrevendo o que aparece nela, além de `width`, `height` e `loading="lazy"`.

## Ver localmente

Basta abrir o `index.html` no navegador. Ou, para simular um servidor:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicação

O site pode ser publicado gratuitamente pelo **GitHub Pages**: em *Settings → Pages*, escolha o branch
`main` e a pasta `/ (root)`.
