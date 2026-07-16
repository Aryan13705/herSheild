FROM node:20-alpine AS base

FROM base AS builder
# Set working directory
WORKDIR /app
COPY . .
RUN corepack enable pnpm
RUN pnpm install
RUN pnpm turbo build --filter=web...

FROM base AS runner
WORKDIR /app
# Only copy the required build output for web
# (This is a simplified Next.js multi-stage dockerfile for Phase 1)
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
