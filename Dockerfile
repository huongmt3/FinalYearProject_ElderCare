FROM node:18

# Set the working directory
WORKDIR / app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install necessary dependencies including boost
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the application
RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD [ "serve", "-s", "dist", "-l", "3000" ]