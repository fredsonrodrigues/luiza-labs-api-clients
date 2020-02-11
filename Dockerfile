FROM mhart/alpine-node:12.15.0

COPY . src/
WORKDIR src/

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
RUN npm test
CMD npm start