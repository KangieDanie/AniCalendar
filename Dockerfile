FROM node:19-bullseye-slim AS base

WORKDIR /usr/local/src/AniCalendar

RUN apt-get update && apt-get install -y git \
    && git clone https://github.com/ValgulNecron/AniCalendar.git /usr/local/src/AniCalendar\
    && cd /usr/local/src/AniCalendar \
    && npm install \
    && npm run build

ENV CLIENT_ID=[CLIENT_ID_ANILIST]
ENV CLIENT_SECRET=[CLIENT_SECRET_ANILIST]
ENV GRAPHQL_ENDPOINT=https://graphql.anilist.co
ENV NEXTAUTH_URL=[URL]
ENV NEXTAUTH_SECRET=[SECRET]

EXPOSE 3000
CMD ["npm", "start"]
