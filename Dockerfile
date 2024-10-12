FROM node:20.18.0-alpine
ARG NODE_ENV=production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json yarn.lock tsconfig.* ./
RUN yarn
COPY ./dist ./dist
CMD ["node", "dist/main.js"]
