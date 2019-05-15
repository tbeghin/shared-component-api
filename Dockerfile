FROM node
COPY . ./shared-component-api/
CMD cd shared-component-api && npm start