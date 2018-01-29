# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:7.8.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install all dependencies of the current project.
COPY package.json package.json

RUN npm install

# Install the server
ADD server/package.json /server/package.json
RUN cd /server && npm install

# Install global CLI
RUN npm install -g cra-universal

# Copy all local files into the image.
COPY . .

# Change directory to your project root first, and run:
RUN cd / && cra-universal build

# Build for production.
RUN cd /dist && npm install --production

# Install and configure `pm2`.
RUN npm install -g pm2
CMD pm2-runtime start ./dist/build/bundle.js
EXPOSE 3001
