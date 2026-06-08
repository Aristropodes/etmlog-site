# ETMLOG · Site Institucional

Site institucional da ETMLOG — transporte de cargas com controle, suporte e responsabilidade operacional.

## Stack

Site estático em HTML5, CSS3 e JavaScript vanilla. Sem build step, sem dependências.

## Estrutura

```
.
├── index.html            # Página inicial
├── sobre.html            # Sobre a ETMLOG
├── servicos.html         # Portfólio de serviços
├── diferenciais.html     # Pilares operacionais
├── contato.html          # Contato + formulário WhatsApp
├── css/
│   └── styles.css        # Design system completo
├── js/
│   └── main.js           # Menu, animações, formulário
├── assets/
│   ├── logo-*.svg        # Logotipos oficiais ETMLOG
│   └── clientes/         # Logotipos de clientes
├── es/                   # Versão em espanhol
├── robots.txt
└── sitemap.xml
```

## Rodar localmente

```bash
# Opção 1: Python
python3 -m http.server 8000

# Opção 2: Node (npx serve)
npx serve .

# Acesse: http://localhost:8000
```

## Deploy

Hospedado via **GitHub Pages** a partir do branch `main` (raiz do repositório). Cada `git push` para `main` republica o site automaticamente.

- Repositório: `Aristropodes/etmlog-site`
- Domínio oficial: [www.etmlog.com.br](https://www.etmlog.com.br) (raiz `etmlog.com.br` redireciona para `www`)
- O arquivo `CNAME` define o domínio customizado no GitHub Pages.

### Atualizar o site

```bash
# na pasta do projeto
git add .
git commit -m "Descreva a alteração"
git push
```

Aguarde ~1 minuto e a alteração estará no ar em www.etmlog.com.br.

## Identidade visual

Seguindo o Manual de Marca ETMLOG:
- Azul institucional `#082744`
- Azul primário `#3370DB`
- Laranja de acento `#F27507`
- Inter (texto) + JetBrains Mono (microtextos técnicos)

## Contato

- WhatsApp: (11) 91142-9001
- Telefone fixo: (31) 3362-3732
- E-mail: comercial@etmlog.com.br
- Endereço: Rua Josias Machado, 164, Inconfidentes — Contagem-MG

---

© ETMLOG — A logística nos conecta. As pessoas nos unem.
