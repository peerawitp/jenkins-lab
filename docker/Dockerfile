FROM oven/bun:1.2-alpine as builder

WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install

COPY src src
COPY tsconfig.json .

RUN bun test

FROM oven/bun:1.2-alpine

WORKDIR /app

COPY package.json .
COPY bun.lock .
RUN bun install --production

COPY src src
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000
