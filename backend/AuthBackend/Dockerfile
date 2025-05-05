FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copie tudo do diretório backend
COPY backend/AuthBackend/ ./

RUN dotnet restore AuthBackend.csproj
RUN dotnet publish AuthBackend.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out ./
ENTRYPOINT ["dotnet", "AuthBackend.dll"]