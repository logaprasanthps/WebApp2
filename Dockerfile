# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Restore dependencies for the WebApp2 project
COPY ["WebApp2/WebApp2.csproj", "WebApp2/"]
RUN dotnet restore "WebApp2/WebApp2.csproj"

# Copy everything and publish
COPY . .
WORKDIR /src/WebApp2
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS="http://+:8080"
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebApp2.dll"]
