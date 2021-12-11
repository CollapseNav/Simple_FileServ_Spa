# FROM dotnet/asp:3.1 AS base
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS http://+:5000
ENV TZ=Asia/Shanghai

# FROM dotnet/sdk:3.1 AS publish
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS publish
WORKDIR /src
COPY ./ ./
RUN  dotnet publish Api -c Release -o /app
COPY ./Api/SpaData-blank.db /app/SpaData.db
COPY ./Api/dist /app/dist


FROM base AS dev
WORKDIR /app
COPY --from=publish /app .
# ENV FileService:ServeMapPath=''
RUN mkdir -p /app/File/root
ENTRYPOINT ["dotnet", "Api.dll"]
