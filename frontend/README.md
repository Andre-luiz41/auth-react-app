
# Sistema de Gestão de Usuários

Uma aplicação web para gerenciamento de usuários com autenticação construída usando React, TypeScript e TailwindCSS.

## Recursos

- 🔐 Autenticação de usuário com tokens JWT
- 👤 Registro de usuário com validação
- 📋 Listagem de usuários (rota protegida)
- 👁️ Visualização de perfil
- 🛡️ Proteção de rotas para usuários autenticados
- 📱 Design responsivo

## Stack de Tecnologias 

### Frontend
- React com TypeScript
- React Router para navegação
- TailwindCSS para estilização
- Componentes UI do ShadCN
- Autenticação JWT

### Backend (.NET Core 8)
- Estrutura em camadas (Controllers, Services, Repositories)
- Entity Framework Core com PostgreSQL
- Autenticação via JWT
- CORS configurado
- Swagger para documentação

## Integração Frontend-Backend

### Configuração da URL da API

O frontend está configurado para se conectar ao backend no Render:

```typescript
// src/lib/constants.ts
export const API_URL = 'https://auth-react-app-production.up.railway.app/';
export const AUTH_TOKEN_KEY = 'auth-token'; 

## Endpoints da API

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/auth/register` | Registrar novo usuário | Não |
| POST | `/api/auth/login` | Autenticar e receber token JWT | Não |
| GET | `/api/users/me` | Obter perfil do usuário atual | Sim |
| GET | `/api/users` | Listar todos os usuários | Sim |
| GET | `/api/health` | Verificar status da API | Não |

## Executando o Projeto Localmente

### Frontend

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Abra [http://localhost:5173](http://localhost:5173) no navegador

### Backend

1. Clone o repositório do backend
2. Certifique-se de ter o .NET Core 8 SDK instalado
3. Configure a string de conexão no appsettings.json
4. Execute as migrações:
   ```
   dotnet ef database update
   ```
5. Inicie o servidor:
   ```
   dotnet run
   ```
6. O Swagger estará disponível em [http://localhost:5000/swagger](http://localhost:5000/swagger)

## Implantação

- Frontend: Vercel (https://user-management-app.vercel.app)
- Backend: Render (https://user-management-api.onrender.com)

## Instruções para Backend no Render

1. Criar conta no Render (render.com)
2. Conectar ao repositório GitHub
3. Criar um novo Web Service
4. Selecionar repositório do backend
5. Configurar:
   - Runtime: .NET Core 8
   - Build Command: `dotnet publish -c Release`
   - Start Command: `dotnet ./bin/Release/net8.0/publish/YourAppName.dll`
6. Adicionar variáveis de ambiente:
   - `ConnectionStrings__DefaultConnection`: string de conexão do PostgreSQL
   - `JWT__Key`: chave secreta para JWT
   - `JWT__Issuer`: emissor do JWT
   - `JWT__Audience`: audiência do JWT

## Usuário de Teste

Para testes, você pode usar as seguintes credenciais:

- Email: admin@exemplo.com
- Senha: Admin123!

## Licença

MIT
