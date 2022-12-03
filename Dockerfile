FROM node:lts as dependencies
WORKDIR /opt/app
COPY package.json ./
COPY tsconfig.json ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /opt/app
COPY . .
COPY --from=dependencies /opt/app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /opt/app
ENV NODE_ENV production

COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/prisma ./prisma
COPY --from=builder /opt/app/.env.example ./.env
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/package.json ./package.json

EXPOSE 3000
RUN yarn prisma generate
RUN yarn prisma migrate deploy
CMD ["yarn", "start"]