FROM node:12-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --verbose
ENV API=http://77.234.215.138:18080/deployment-service
ENV FIREBASE_API=AIzaSyCExaLzKWdhhr_1IRPe1NIFdR7Uor12LTI
ENV API_USER_SERVICE=http://77.234.215.138:18080
COPY . /app
RUN npm run build

RUN ls

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/react_counter /etc/nginx/sites-available/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
