# official Node.js image 
FROM node:18

# Create and set workpath
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Rest of the application
COPY . .

EXPOSE 5000

CMD ["npm", "start"]