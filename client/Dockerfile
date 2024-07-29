FROM node:21

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# Build the Next.js application
RUN npm run build

EXPOSE 5041

CMD ["npm", "run", "dev"]