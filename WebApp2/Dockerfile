# Multi-stage build optimized for Vercel
FROM mcr.microsoft.com/dotnet/sdk:10.0 as build
WORKDIR /src

# Restore dependencies
COPY WebApp2/*.csproj ./WebApp2/
RUN dotnet restore WebApp2/WebApp2.csproj

# Copy source and publish
COPY WebApp2/ ./WebApp2/
WORKDIR /src/WebApp2
RUN dotnet publish -c Release -o /app/publish --no-restore

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 8080
ENTRYPOINT ["dotnet", "WebApp2.dll"]
