# Nginx Configuration for Certbot

This guide provides a basic Nginx configuration for HTTP, designed to be easily integrated with Certbot for automatic HTTPS setup.

## 1. Create the Nginx HTTP-only Configuration

First, create a configuration file. You can save the following content into a file named `nginx_for_certbot.conf` (which I've already done for you).

```nginx
server {
    listen 80;
    server_name binarykeeda.com www.binarykeeda.com;

    location / {
        proxy_pass http://localhost:30303;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Certbot will add HTTPS configuration here
}
```

## 2. Deploy and Enable Nginx Configuration

Copy the configuration file to the Nginx `sites-available` directory and enable it.

```bash
# Copy the configuration file to Nginx sites-available
sudo cp nginx_for_certbot.conf /etc/nginx/sites-available/binarykeeda.com

# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/binarykeeda.com /etc/nginx/sites-enabled/

# Test your Nginx configuration for syntax errors
sudo nginx -t

# Reload Nginx to apply the new configuration
sudo systemctl reload nginx
```

## 3. Run Certbot for SSL

Once your HTTP Nginx site is active, run Certbot to obtain and configure SSL certificates. Certbot will automatically detect your Nginx setup, issue certificates, and modify your Nginx configuration to include HTTPS.

```bash
# Run Certbot with the Nginx plugin
sudo certbot --nginx -d binarykeeda.com -d www.binarykeeda.com
```

Certbot will guide you through the process and will typically:
*   Ask for an email address for urgent renewal notices.
*   Ask you to agree to the Terms of Service.
*   Offer to redirect HTTP traffic to HTTPS (recommended).

After Certbot completes, your Nginx configuration file (`/etc/nginx/sites-available/binarykeeda.com`) will be updated to handle HTTPS traffic and redirect HTTP to HTTPS.
