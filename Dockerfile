FROM node:latest
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN yarn add --silent
RUN yarn add react-scripts@5.0.1 -g --silent
COPY . ./
CMD ["yarn", "start"]