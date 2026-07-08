# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy project files
COPY --chown=app:app ["WebApp2/WebApp2.csproj", "./WebApp2/"]
RUN dotnet restore "./WebApp2/WebApp2.csproj"

# Copy source code
COPY --chown=app:app . .

# Build application
RUN dotnet build "./WebApp2/WebApp2.csproj" -c Release -o /app/build

# Publish stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
EXPOSE 3000

ENV ASPNETCORE_URLS=http://+:3000
ENV ASPNETCORE_ENVIRONMENT=Production

# Copy published app
COPY --from=build /app/build .

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/employees || exit 1

# Run the application
ENTRYPOINT ["dotnet", "WebApp2.dll"]
