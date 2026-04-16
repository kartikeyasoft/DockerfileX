FROM nginx:alpine

# Copy the pre‑built static files from your local build folder
# Make sure you run `npm run build` locally before building the Docker image
COPY ./build /usr/share/nginx/html

# Write the nginx configuration (SPA routing, no backend proxy)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx (keeps container alive)
CMD ["nginx", "-g", "daemon off;"]
