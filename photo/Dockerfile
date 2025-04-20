# Use the official Playwright image as the base image
FROM mcr.microsoft.com/playwright:v1.52.0-noble

# Set the working directory
WORKDIR /app

# Install Node.js dependencies
COPY package.json /app/package.json
RUN npm install

# Copy the TypeScript and server files into the container
COPY . /app

# Expose the port that the server will run on
EXPOSE 4000

# Command to run the server
CMD ["npx", "ts-node", "server.ts"]
