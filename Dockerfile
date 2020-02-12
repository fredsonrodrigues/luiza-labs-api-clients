FROM mhart/alpine-node:12.15.0

COPY . src/
WORKDIR src/

ENV NPM_CONFIG_LOGLEVEL warn
RUN cp .env.example .env
RUN npm install
CMD npm start