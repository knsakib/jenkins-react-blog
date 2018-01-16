FROM node:7.7-alpine
MAINTAINER Khalid Nazmus Sakib <knsakib@gmail.com>

# install deps
ADD package.json /tmp/package.json
RUN cd /tmp && npm build --production

# Copy deps
RUN mkdir -p /opt/knsakib-react-blog && cp -a /tmp/node_modules /opt/knsakib-react-blog

# Setup workdir
WORKDIR /opt/knsakib-react-blog
COPY . /opt/knsakib-react-blog

# Install `serve` to run the application.
RUN npm install -g serve

# run
EXPOSE 3000
CMD serve -s build
