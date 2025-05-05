# Use a imagem base do .NET SDK para construir a aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copie o arquivo de projeto e restaure as dependências
COPY backend/AuthBackend/*.csproj backend/AuthBackend/
RUN dotnet restore backend/AuthBackend/AuthBackend.csproj

# Copie o resto do código-fonte
COPY backend/AuthBackend/ backend/AuthBackend/
RUN dotnet publish backend/AuthBackend/AuthBackend.csproj -c Release -o out

# Use a imagem base do ASP.NET Core para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out ./
ENTRYPOINT ["dotnet", "AuthBackend.dll"] # Ajuste o nome do assembly se necessário
