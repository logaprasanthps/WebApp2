# Multi-stage Dockerfile for .NET 10 on Vercel
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["WebApp2/WebApp2.csproj", "WebApp2/"]
RUN dotnet restore "WebApp2/WebApp2.csproj"
COPY . .
RUN dotnet publish "WebApp2/WebApp2.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WebApp2.dll"]
