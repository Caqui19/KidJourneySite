# KidJourney — Site

## Apresentação

O KidJourney é uma plataforma digital voltada ao acompanhamento dos primeiros anos de vida da criança. Este repositório contém o site institucional e a área destinada aos profissionais parceiros. O site apresenta o projeto, permite a criação de contas de clientes, recebe solicitações de parceria e oferece aos parceiros aprovados ferramentas para publicar conteúdos e divulgações.

## Problema e objetivo

Pais, mães e responsáveis, especialmente aqueles que estão vivendo a primeira experiência de cuidado, podem ter dificuldade para encontrar orientações confiáveis e adequadas às necessidades de cada criança. O KidJourney busca reunir informações e recomendações relacionadas à alimentação e ao desenvolvimento infantil, considerando a etapa e as especificidades informadas no perfil da criança. A plataforma também aproxima as famílias de profissionais da área da saúde que contribuem com recomendações e conteúdos.

## Público-alvo

- Pais, mães e responsáveis por crianças de 0 a 5 anos;
- Profissionais da saúde, como nutricionistas e pediatras, que solicitem participação como parceiros;
- Equipe responsável pela análise das solicitações e administração dos acessos de parceiros.

## Principais funcionalidades

- Apresentação institucional do projeto, de seus objetivos e de sua equipe;
- Cadastro e autenticação de usuários por e-mail e senha;
- Acesso à política de segurança e recuperação de senha;
- Formulário de contato e solicitação de parceria;
- Análise manual das solicitações e criação de contas para profissionais aprovados;
- Área do parceiro para criar, editar, publicar, salvar como rascunho e excluir recomendações ou divulgações;
- Classificação das publicações por categoria, faixa etária e especificidades alimentares;
- Registro de visualizações das publicações;
- Página informativa sobre os recursos Premium.

As solicitações de parceria são encaminhadas por e-mail por meio do FormSubmit. A análise e a aprovação são realizadas pela equipe. O site não possui integração com um serviço de pagamento; portanto, a página Premium não processa cobranças reais.

## Tecnologias e ferramentas

- **React** e **React Router** para a interface e navegação;
- **Vite** para desenvolvimento e geração da versão de produção;
- **CSS** para a apresentação responsiva;
- **Firebase Authentication** para autenticação;
- **Cloud Firestore** para perfis de usuários e publicações;
- **Firebase Hosting** para hospedagem;
- **FormSubmit** para encaminhamento dos formulários por e-mail;
- **Git e GitHub** para versionamento e disponibilização do código.

## Integrantes do grupo

- **Alvaro Takeshi Kawaguti Barbosa** — design técnico, organização e correção de problemas;
- **André Luíz Alves dos Santos Souza** — cofundador e idealizador; design, comunicação e coleta de dados;
- **Denis de Lucas Reis Silva** — idealizador; design, organização de arquivos, pesquisa de campo e análise de dados;
- **Isaac Alamos Oliveira** — desenvolvimento, organização e ajustes técnicos do aplicativo;
- **João Vitor Gonçalves Canuto** — design, documentação, ideias, divulgação e coleta por formulário.

## Instalação e execução

### Pré-requisitos

- Node.js e npm;
- Projeto Firebase configurado com Authentication, Cloud Firestore e Firebase Hosting.

### Configuração

Na raiz do repositório, acesse a pasta que contém o projeto React e instale as dependências:

```bash
cd KidJourneyParceiros
npm install
```

Crie um arquivo `.env` nessa pasta e configure as variáveis do Firebase. Os valores devem ser obtidos na configuração do projeto Firebase; não publique credenciais privadas no repositório.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir o site no navegador.

### Compilação para produção

```bash
npm run build
```

O resultado será criado na pasta `dist`. Para visualizar localmente a compilação:

```bash
npm run preview
```

### Verificação do código

```bash
npm run lint
```

## Estrutura do repositório

```text
README.md
KidJourneyParceiros/
├── public/
├── src/
├── .env                 # configuração local; não deve ser enviada ao GitHub
├── firebase.json
├── package.json
└── vite.config.js
```

## Observação sobre dados e segurança

As credenciais usadas localmente devem permanecer no arquivo `.env`, que não deve ser versionado. O acesso aos dados deve ser controlado também pelas regras do Cloud Firestore. As variáveis de configuração do Firebase usadas no navegador não substituem regras de segurança: as permissões de leitura e gravação precisam ser definidas no próprio Firebase.
