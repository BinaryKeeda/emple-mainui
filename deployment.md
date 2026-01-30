# Deployment Guide

This document provides instructions for deploying the application.

## Nginx Installation

First, install Nginx on your server. For Debian-based systems (like Ubuntu), you can use the following commands:

```bash
sudo apt update
sudo apt install nginx
```

## Docker Installation

To run this application in a Docker container, you need to install Docker Engine.

### Ubuntu Installation

1.  **Set up the repository:**

    ```bash
    sudo apt-get update
    sudo apt-get install \
        ca-certificates \
        curl \
        gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

2.  **Install Docker Engine:**

    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

For other operating systems, follow the official documentation: [Install Docker Engine](https://docs.docker.com/engine/install/)

## Docker Setup

1.  **Build the Docker image:**

    ```bash
    docker build -t binarykeeda-frontend .
    ```

2.  **Run the Docker container:**

    Assuming your application runs on port 3000 inside the container, you can map it to a host port.

    ```bash
    docker run -d -p 3000:3000 --name binarykeeda-app binarykeeda-frontend
    ```

    You can also use the `docker-compose.yml` file provided:
    ```bash
    docker-compose up -d --build
    ```

## Nginx Configuration with SSL (Certbot)

This configuration sets up Nginx to serve your application with an SSL certificate from Let's Encrypt using Certbot. It also includes a proxy pass to the running Docker container.

### 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

Run the following command to obtain a certificate for your domain. Certbot will automatically update your Nginx configuration.

```bash
sudo certbot --nginx -d binarykeeda.com -d www.binarykeeda.com
```

### 3. Example Nginx Configuration

Create a configuration file for your site in `/etc/nginx/sites-available/binarykeeda.com`:

```nginx
server {
    listen 80;
    server_name www.binarykeeda.com binarykeeda.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name www.binarykeeda.com binarykeeda.com;

    ssl_certificate /etc/letsencrypt/live/binarykeeda.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/binarykeeda.com/privkey.pem;

    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3030; # Proxy to the Docker container
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # You can add other locations here, for example, to serve static files directly
    # location /static/ {
    #     alias /path/to/your/static/files/;
    # }
}
```

After creating the file, enable the site by creating a symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/binarykeeda.com /etc/nginx/sites-enabled/
```

Finally, test your Nginx configuration and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Environment Variables

Create a `.env` file in the root of the project with the following variables.

```
# .env.example

# The base URL for the API
REACT_APP_API_URL=https://binarykeeda.com/api
```