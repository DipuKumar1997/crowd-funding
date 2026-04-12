#!/bin/bash

# Create root folder
mkdir -p crowdfunding-frontend

cd crowdfunding-frontend || exit

# Create main folders
mkdir -p public
mkdir -p src/api
mkdir -p src/assets
mkdir -p src/components
mkdir -p src/context
mkdir -p src/pages
mkdir -p src/routes
mkdir -p src/utils

# Create API files
touch src/api/axios.js
touch src/api/authApi.js
touch src/api/projectApi.js
touch src/api/donationApi.js

# Create component files
touch src/components/Navbar.jsx
touch src/components/ProjectCard.jsx
touch src/components/Loader.jsx

# Create context file
touch src/context/AuthContext.jsx

# Create pages
touch src/pages/Home.jsx
touch src/pages/Login.jsx
touch src/pages/Register.jsx
touch src/pages/ProjectDetails.jsx
touch src/pages/CreateProject.jsx
touch src/pages/Dashboard.jsx

# Create routes
touch src/routes/AppRoutes.jsx

# Create utils
touch src/utils/helpers.js

# Create root files
touch src/App.jsx
touch src/main.jsx

touch .env
touch package.json
touch vite.config.js

echo "✅ Crowdfunding frontend structure created successfully!"
