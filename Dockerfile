# Dockerfile for deploying the ASP.NET Core 10 application on Vercel using the @vercel/docker builder
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files
COPY *.sln ./
COPY WebApp2/*.csproj WebApp2/

# Restore and publish
RUN dotnet restore
COPY . .
RUN dotnet publish WebApp2 -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Listen on the port Vercel maps into the container
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WebApp2.dll"]
