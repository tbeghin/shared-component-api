FROM node
COPY . /lib
CMD ["node lib/server.js"]