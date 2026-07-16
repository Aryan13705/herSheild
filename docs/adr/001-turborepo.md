# ADR 001: Use Turborepo

## Status
Accepted

## Context
We need a monorepo setup to support a Next.js web app, an admin dashboard, and future React Native mobile apps while sharing configurations, UI components, and business logic.

## Decision
We will use Turborepo with pnpm workspaces.

## Consequences
- Faster builds via remote caching.
- Enforced modularity through isolated packages.
- Increased initial setup complexity.
