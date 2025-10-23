FROM node:22

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . . 

# Expose the port the app runs on
EXPOSE 5173

# Run the frontend app
CMD ["npm", "run", "dev", "--", "--host"]
