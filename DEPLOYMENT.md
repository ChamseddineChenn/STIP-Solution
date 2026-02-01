# 🚀 STIP Solutions - Complete VPS Deployment Guide

This comprehensive guide walks you through deploying the STIP Solutions website on a VPS with Nginx, PM2, and free auto-renewable SSL certificates (Let's Encrypt).

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [VPS Initial Setup](#vps-initial-setup)
3. [Install Required Software](#install-required-software)
4. [Clone and Configure Project](#clone-and-configure-project)
5. [Build Frontend Applications](#build-frontend-applications)
6. [Configure PM2 for Backend](#configure-pm2-for-backend)
7. [Configure Nginx](#configure-nginx)
8. [Setup SSL with Let's Encrypt](#setup-ssl-with-lets-encrypt)
9. [Domain DNS Configuration](#domain-dns-configuration)
10. [Final Testing & Troubleshooting](#final-testing--troubleshooting)
11. [Maintenance Commands](#maintenance-commands)

---

## 📦 Prerequisites

Before starting, ensure you have:

- ✅ A VPS (Ubuntu 22.04 or 24.04 LTS recommended)
- ✅ A domain name (e.g., `stipsolutions.com`)
- ✅ SSH access to your VPS
- ✅ Domain DNS access to configure A records
- ✅ Your project code in a Git repository (GitHub, GitLab, etc.)

### Recommended VPS Specs
- **RAM**: 2GB minimum (4GB recommended)
- **CPU**: 1-2 vCPUs
- **Storage**: 20GB SSD
- **OS**: Ubuntu 22.04 LTS or 24.04 LTS

---

## 🔧 VPS Initial Setup

### Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip-address
```

### Step 2: Update System Packages

```bash
apt update && apt upgrade -y
```

### Step 3: Create a Non-Root User (Recommended for Security)

```bash
# Create new user
adduser stip

# Add to sudo group
usermod -aG sudo stip

# Switch to new user
su - stip
```

### Step 4: Configure Firewall (UFW)

```bash
# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 📥 Install Required Software

### Step 1: Install Node.js (v20 LTS)

```bash
# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version   # Should show v20.x.x
npm --version    # Should show 10.x.x
```

### Step 2: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 3: Install Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify Nginx is running
sudo systemctl status nginx
```

### Step 4: Install Git

```bash
sudo apt install git -y
git --version
```

### Step 5: Install Certbot (Let's Encrypt)

```bash
# Install Certbot with Nginx plugin
sudo apt install certbot python3-certbot-nginx -y
```

---

## 📂 Clone and Configure Project

### Step 1: Create Project Directory

```bash
# Create directory for the project
sudo mkdir -p /var/www/stip-solutions
sudo chown -R $USER:$USER /var/www/stip-solutions
cd /var/www/stip-solutions
```

### Step 2: Clone Your Repository

```bash
# Clone via HTTPS (or SSH if you have keys configured)
git clone https://github.com/your-username/stip-solutions.git .

# Or if the repo is private, you may need to use a personal access token:
# git clone https://your-token@github.com/your-username/stip-solutions.git .
```

### Step 3: Install Dependencies for All Apps

```bash
# Install backend dependencies
cd /var/www/stip-solutions/backend
npm install --production

# Install frontend dependencies
cd /var/www/stip-solutions/frontend
npm install

# Install admin dependencies
cd /var/www/stip-solutions/admin
npm install
```

### Step 4: Configure Environment Variables

#### Backend (.env)

```bash
cd /var/www/stip-solutions/backend
nano .env
```

Add the following (replace with your actual values):

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Connection (Your MongoDB Atlas connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stip-solutions

# JWT Secrets (Generate new secure secrets for production!)
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-production-jwt-secret-64-chars-minimum
JWT_REFRESH_SECRET=your-production-refresh-secret-64-chars-minimum

# Default Admin (Change these!)
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_EMAIL=admin@stipsolutions.com
DEFAULT_ADMIN_PASSWORD=YourSecureProductionPassword123!

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS - Allowed Origins (your actual domains)
ALLOWED_ORIGINS=https://stipsolutions.com,https://www.stipsolutions.com,https://admin.stipsolutions.com
```

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

#### Frontend (.env)

```bash
cd /var/www/stip-solutions/frontend
nano .env
```

```env
VITE_API_URL=https://stipsolutions.com/api
VITE_SITE_URL=https://stipsolutions.com
VITE_ENV=production
```

#### Admin (.env)

```bash
cd /var/www/stip-solutions/admin
nano .env
```

```env
VITE_API_URL=https://stipsolutions.com/api
VITE_SITE_URL=https://admin.stipsolutions.com
VITE_ENV=production
```

---

## 🏗️ Build Frontend Applications

### Step 1: Build the Public Frontend

```bash
cd /var/www/stip-solutions/frontend
npm run build
```

This creates a `dist` folder with production-ready static files.

### Step 2: Build the Admin Panel

```bash
cd /var/www/stip-solutions/admin
npm run build
```

This creates a `dist` folder for the admin panel.

### Step 3: Verify Builds

```bash
# Check that dist folders exist
ls -la /var/www/stip-solutions/frontend/dist
ls -la /var/www/stip-solutions/admin/dist
```

---

## ⚙️ Configure PM2 for Backend

### Step 1: Create PM2 Ecosystem File

```bash
cd /var/www/stip-solutions
nano ecosystem.config.js
```

Add the following configuration:

```javascript
module.exports = {
  apps: [
    {
      name: 'stip-backend',
      cwd: '/var/www/stip-solutions/backend',
      script: 'src/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/var/www/stip-solutions/logs/backend-error.log',
      out_file: '/var/www/stip-solutions/logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '500M',
      watch: false,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 4000
    }
  ]
};
```

### Step 2: Create Logs Directory

```bash
mkdir -p /var/www/stip-solutions/logs
```

### Step 3: Start the Backend with PM2

```bash
cd /var/www/stip-solutions
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs stip-backend
```

### Step 4: Configure PM2 to Start on Boot

```bash
# Generate startup script
pm2 startup systemd

# This will output a command - copy and run it as sudo
# Example: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u stip --hp /home/stip

# Save current PM2 process list
pm2 save
```

### Step 5: Seed Default Admin User

```bash
cd /var/www/stip-solutions/backend
node src/scripts/seedAdmin.js
```

---

## 🌐 Configure Nginx

### Step 1: Create Nginx Configuration for Main Site

```bash
sudo nano /etc/nginx/sites-available/stipsolutions.com
```

Add the following configuration:

```nginx
# Redirect HTTP to HTTPS (will be configured by Certbot)
server {
    listen 80;
    listen [::]:80;
    server_name stipsolutions.com www.stipsolutions.com;
    
    # Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name stipsolutions.com www.stipsolutions.com;

    # SSL certificates (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/stipsolutions.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/stipsolutions.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;

    # Frontend static files
    root /var/www/stip-solutions/frontend/dist;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to Node.js backend
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    # Socket.io WebSocket support
    location /socket.io {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Step 2: Create Nginx Configuration for Admin Panel

```bash
sudo nano /etc/nginx/sites-available/admin.stipsolutions.com
```

Add the following configuration:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name admin.stipsolutions.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# Admin HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name admin.stipsolutions.com;

    # SSL certificates (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/admin.stipsolutions.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/admin.stipsolutions.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # Admin panel static files
    root /var/www/stip-solutions/admin/dist;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.io WebSocket support
    location /socket.io {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Step 3: Enable Sites and Test Configuration

```bash
# Create symbolic links to enable sites
sudo ln -s /etc/nginx/sites-available/stipsolutions.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/admin.stipsolutions.com /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 Setup SSL with Let's Encrypt

### Step 1: Obtain SSL Certificates

**Important**: Before running Certbot, ensure your domain DNS A records are pointing to your VPS IP address!

```bash
# Obtain certificates for main domain
sudo certbot --nginx -d stipsolutions.com -d www.stipsolutions.com

# Obtain certificate for admin subdomain
sudo certbot --nginx -d admin.stipsolutions.com
```

Certbot will:
1. Verify domain ownership
2. Obtain SSL certificates
3. Automatically configure Nginx to use them
4. Set up auto-renewal

### Step 2: Verify Auto-Renewal

```bash
# Test renewal process
sudo certbot renew --dry-run

# Check renewal timer
sudo systemctl status certbot.timer
```

### Step 3: Verify SSL is Working

```bash
# Check certificate expiry
sudo certbot certificates

# Test SSL (after DNS propagation)
curl -I https://stipsolutions.com
curl -I https://admin.stipsolutions.com
```

---

## 🌍 Domain DNS Configuration

### Configure DNS A Records

In your domain registrar's DNS settings (or Cloudflare, etc.), add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_VPS_IP | 300 |
| A | www | YOUR_VPS_IP | 300 |
| A | admin | YOUR_VPS_IP | 300 |

### Wait for DNS Propagation

DNS changes can take 5 minutes to 48 hours to propagate globally.

Check propagation status:
```bash
# From your local machine or VPS
dig stipsolutions.com
dig www.stipsolutions.com
dig admin.stipsolutions.com

# Or use online tools like:
# https://www.whatsmydns.net/
```

---

## ✅ Final Testing & Troubleshooting

### Test Checklist

1. **Frontend (https://stipsolutions.com)**
   - [ ] Homepage loads
   - [ ] All pages navigate correctly
   - [ ] Forms submit successfully
   - [ ] Images load properly

2. **Admin Panel (https://admin.stipsolutions.com)**
   - [ ] Login page loads
   - [ ] Can login with admin credentials
   - [ ] Dashboard displays data
   - [ ] Real-time notifications work

3. **API (https://stipsolutions.com/api)**
   - [ ] Health check: `curl https://stipsolutions.com/api/health`

### Common Issues & Solutions

#### Issue: 502 Bad Gateway
```bash
# Check if backend is running
pm2 status

# Check backend logs
pm2 logs stip-backend --lines 50

# Restart backend
pm2 restart stip-backend
```

#### Issue: CORS Errors
```bash
# Check ALLOWED_ORIGINS in backend .env
nano /var/www/stip-solutions/backend/.env

# Ensure domains match exactly (with https://)
# Restart backend after changes
pm2 restart stip-backend
```

#### Issue: WebSocket Connection Failed
```bash
# Check Nginx socket.io config
sudo nginx -t

# Check backend logs for socket errors
pm2 logs stip-backend | grep -i socket
```

#### Issue: SSL Certificate Not Working
```bash
# Check certificate status
sudo certbot certificates

# Re-run Certbot if needed
sudo certbot --nginx -d stipsolutions.com -d www.stipsolutions.com
```

#### Issue: MongoDB Connection Failed
```bash
# Check backend logs
pm2 logs stip-backend --lines 100 | grep -i mongo

# Verify MongoDB Atlas IP whitelist includes your VPS IP
# Or use 0.0.0.0/0 for allow all (less secure)
```

---

## 🛠️ Maintenance Commands

### PM2 Commands

```bash
# View all processes
pm2 status

# View logs
pm2 logs stip-backend
pm2 logs stip-backend --lines 100

# Restart application
pm2 restart stip-backend

# Stop application
pm2 stop stip-backend

# Delete application
pm2 delete stip-backend

# Monitor resources
pm2 monit
```

### Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View error logs
sudo tail -f /var/log/nginx/error.log

# View access logs
sudo tail -f /var/log/nginx/access.log
```

### Update Application

```bash
# Pull latest code
cd /var/www/stip-solutions
git pull origin main

# If backend changed
cd backend
npm install --production
pm2 restart stip-backend

# If frontend changed
cd ../frontend
npm install
npm run build

# If admin changed
cd ../admin
npm install
npm run build

# Reload Nginx to clear cache
sudo systemctl reload nginx
```

### SSL Certificate Renewal

Certificates auto-renew, but you can manually renew:

```bash
sudo certbot renew
```

### Backup Database

MongoDB Atlas provides automated backups. For manual backup:

```bash
# Install mongodump
sudo apt install mongodb-database-tools

# Create backup
mongodump --uri="your-mongodb-uri" --out=/var/www/stip-solutions/backups/$(date +%Y%m%d)
```

---

## 📊 Monitoring & Logs

### Set Up Log Rotation

```bash
sudo nano /etc/logrotate.d/stip-solutions
```

Add:

```
/var/www/stip-solutions/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 stip stip
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

### Monitor Server Resources

```bash
# Install htop for better resource monitoring
sudo apt install htop -y
htop

# Check disk usage
df -h

# Check memory usage
free -m
```

---

## 🎉 Deployment Complete!

Your STIP Solutions website should now be live at:

- **Main Site**: https://stipsolutions.com
- **Admin Panel**: https://admin.stipsolutions.com

### Security Reminders

- ✅ Change default admin password immediately
- ✅ Keep system packages updated: `sudo apt update && sudo apt upgrade`
- ✅ Monitor logs for suspicious activity
- ✅ Regular backups of your MongoDB database
- ✅ Keep Node.js and npm packages updated

### Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs stip-backend`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas whitelist includes your VPS IP

---

**Congratulations! Your STIP Solutions website is now deployed! 🚀**
