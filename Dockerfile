
FROM node:latest as build 

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install
RUN npm install -g @angular/cli 

RUN npm run build  

FROM nginx:latest 
COPY --from=build /usr/local/app/dist/night-fury-ecommerece-application /usr/share/nginx/html 

EXPOSE 80