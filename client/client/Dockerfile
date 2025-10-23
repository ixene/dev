FROM node:22

WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . ./

# Expose the port the app runs on
EXPOSE 5173

# Run the frontend application
CMD ["npm", "run", "dev", "--", "--host"]
