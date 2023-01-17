FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY /environments/environment.ts
COPY /src ./src
COPY /nest-cli.json ./
COPY /package.json ./
COPY /tsconfig.build.json ./
COPY /tsconfig.json ./
RUN npm i -g @nestjs/cli
RUN npm i

EXPOSE 3000

CMD [ "nest", "start" ]
