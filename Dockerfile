FROM node:22-alpine AS deps
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3015

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/astro.config.mjs ./astro.config.mjs
COPY --from=build /app/public ./public

EXPOSE 3015

CMD ["pnpm", "astro", "preview", "--host", "0.0.0.0", "--port", "3015"]
