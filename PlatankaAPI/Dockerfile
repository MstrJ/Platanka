#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80


FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["PlatankaAPI/PlatankaAPI.csproj", "PlatankaAPI/"]
COPY ["PlatankaAPI/Models/Models.csproj", "Models/"]
COPY ["PlatankaAPI/Repositories/Repositories.csproj", "PlatankaAPI/Repositories/"]
COPY ["PlatankaAPI/Services/Services.csproj", "PlatankaAPI/Services/"]
RUN dotnet restore "PlatankaAPI/PlatankaAPI.csproj"
COPY . .
WORKDIR "/src/PlatankaAPI"
RUN dotnet build "PlatankaAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PlatankaAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PlatankaAPI.dll"]
