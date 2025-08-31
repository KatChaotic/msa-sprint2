# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

RUN npm install -g corepack

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock* .yarnrc.yml ./

COPY .yarn ./.yarn

# Install the application dependencies
RUN yarn set version stable && yarn install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the application port
# EXPOSE 5000

# Command to run the application
CMD ["node", "dist/main"]