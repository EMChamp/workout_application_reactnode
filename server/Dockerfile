FROM node:21

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5040

CMD ["npm", "start"]
