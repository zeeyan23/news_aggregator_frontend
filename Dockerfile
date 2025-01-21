# Step 1: Use a lightweight Node.js image
FROM node:20-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a lightweight web server to serve the app
FROM nginx:1.25.2-alpine

# Step 8: Copy the build output to the Nginx container's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 10: Expose the port the app runs on
EXPOSE 80

# Step 11: Start the server
CMD ["nginx", "-g", "daemon off;"]
