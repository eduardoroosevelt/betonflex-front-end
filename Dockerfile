FROM node:18.12

WORKDIR /app
COPY package.json package-lock.json ./
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

COPY . .

EXPOSE 8080


CMD ["npm","run","dev","--","--host"]
