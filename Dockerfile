FROM node:18

WORKDIR /app

COPY . .

RUN npm install --force
RUN npm run build

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
