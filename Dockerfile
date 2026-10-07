# Genere par NDD/scripts/vercel-to-caddy.py (2026-10-07, sortie de Vercel).
# Build Astro statique, servi par Caddy sur Railway. Les redirections et en-tetes
# vivent dans Caddyfile, regenere depuis vercel.json : modifier vercel.json puis relancer le script.
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
