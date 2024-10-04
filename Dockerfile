FROM node:20.18.0
LABEL maintainer "ODL DevOps <mitx-devops@mit.edu>"

RUN apt-get update && apt-get install libelf1

COPY package.json /src/

RUN mkdir -p /root/.cache/yarn

RUN chown root:root /root/.cache/yarn