# syntax=docker/dockerfile:1.7

FROM node:20-bookworm AS base
WORKDIR /app
COPY package.json package-lock.json* tsconfig.base.json .prettierrc.json ./
COPY packages ./packages
RUN npm install --omit=dev

FROM base AS backend
WORKDIR /app
RUN npm --workspace @mediqueuepro/backend run build
CMD ["npm", "--workspace", "@mediqueuepro/backend", "run", "start"]

FROM node:20-bookworm AS frontend
WORKDIR /app
COPY package.json package-lock.json* tsconfig.base.json .prettierrc.json ./
COPY packages ./packages
RUN npm install
RUN npm --workspace @mediqueuepro/frontend run build
CMD ["npm", "--workspace", "@mediqueuepro/frontend", "run", "start"]
