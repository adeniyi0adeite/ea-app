#!/bin/bash

# Function to create a file if it doesn't exist
create_file_if_not_exists() {
  if [ ! -f "$1" ]; then
    echo "$2" > "$1"
    echo "Created: $1"
  else
    echo "File already exists: $1"
  fi
}

# Create the directory structure for the backend
mkdir -p back-end/controllers
mkdir -p back-end/models
mkdir -p back-end/routes
mkdir -p back-end/middleware
mkdir -p back-end/config
mkdir -p back-end/utils

# Create and add comments to the controller files
create_file_if_not_exists back-end/controllers/authController.ts "// Handles user authentication"
create_file_if_not_exists back-end/controllers/productController.ts "// Handles product-related logic"
create_file_if_not_exists back-end/controllers/cartController.ts "// Handles cart logic"

# Create and add comments to the model files
create_file_if_not_exists back-end/models/User.ts "// User model (e.g., Sequelize or TypeORM)"
create_file_if_not_exists back-end/models/Product.ts "// Product model"
create_file_if_not_exists back-end/models/Order.ts "// Order model"

# Create and add comments to the route files
create_file_if_not_exists back-end/routes/authRoutes.ts "// Authentication routes"
create_file_if_not_exists back-end/routes/productRoutes.ts "// Product-related routes"
create_file_if_not_exists back-end/routes/cartRoutes.ts "// Cart routes"

# Create and add comments to the middleware file
create_file_if_not_exists back-end/middleware/authMiddleware.ts "// Middleware for JWT authentication"

# Create and add comments to the config files
create_file_if_not_exists back-end/config/db.ts "// Database connection/configuration"
create_file_if_not_exists back-end/config/env.ts "// Environment variables setup"

# Create and add comments to the utils file
create_file_if_not_exists back-end/utils/validation.ts "// Form validation, sanitization, etc."

# Create the server entry point and add a comment
create_file_if_not_exists back-end/server.ts "// Server entry point"


# Notify the user that the setup is complete
echo "Backend folder structure and files have been created (if they did not already exist)."
