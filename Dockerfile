FROM node
COPY . /
CMD ["node lib/server.js"]