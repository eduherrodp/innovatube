FROM node:18 AS build

WORKDIR /app

# Copy conf files
COPY package*.json ./

# Install dependences
RUN npm install

# Rest of the application
COPY . .

# Build app
RUN npm run build

# Set nginx 
FROM nginx:alpine

# Copy build files to nginx path
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD [ "nginx", "-g", "daemon off;"]