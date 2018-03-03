FROM node:carbon

WORKDIR /var/www

RUN yarn

EXPOSE 3000

COPY . .

CMD ["yarn", "start:watch"]