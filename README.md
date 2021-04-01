# Deployer

![Бранч](https://fotki.ykt.ru/albums/userpics/25096/814621324618787_ssatlantis8.jpg)

Deployer - Пользовательский веб-интерфейс для 
развертывания контейнерных приложений, 
устранения неполадок и управления ресурсами кластера.

Вы можете использовать Deployer, чтобы получить обзор приложений, работающих
в вашем кластере, а так же для создания или изменения отдельных ресурсов.

### Minimum requirements
+ Node `>=10`
+ Git `>=2.13.0`

### Quick start
```
git clone https://github.com/microservices-course-itmo/deployer.git
cd deployer
npm ci
npm run dev
```

### Build
```
npm run build
```

### Lint
```
npm run lint
```

## Deploy

Login To Your Server

ssh username@YOUR_SERVER_IP

Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. Node.js gives us the possibility to use JavaScript as a BackEnd language like Python, Java or PHP.

NPM is a package manager for the JavaScript programming language. It is the default package manager for Node.js.

Use Current Release
$ sudo apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
$ sudo apt-get install nodejs
Test NodeJS version
$ nodejs -V
v13.3.0
Test NPM version
$ npm --v
6.13.1
We've successfully installed NodeJs and NPM.

2- Install Nginx
Nginx is a free, open-source, high-performance HTTP server.
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install nginx

Build production files local, then use 

scp -r ./dist root@194.58.111.133:/

to copy build folder to production server.

Create a project file
sudo nano /etc/nginx/sites-available/react_counter
server {
        listen 80;
        listen [::]:80;

        root /dist;
        index index.html index.htm;

        server_name 194.58.111.133;

        location / {
                try_files $uri /index.html;

        }
}

Test NGINX config
$ sudo nginx -t
Restart Nginx Server
$ sudo systemctl restart nginx
Open your browser and go to http://194.58.111.133/
