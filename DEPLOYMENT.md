# PixelScribe Deployment Guide

This guide explains how to deploy PixelScribe to Render.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at [render.com](https://render.com))
3. A MongoDB Atlas database (sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
4. Cloudinary account for image storage (sign up at [cloudinary.com](https://cloudinary.com))
5. Razorpay account for payments (sign up at [razorpay.com](https://razorpay.com))

## Deployment Steps

### 1. Prepare Your Repository

1. Push your code to a GitHub repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/PixelScribe.git
   git push -u origin main
   ```

### 2. Set Up Environment Variables

#### Backend Environment Variables
Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=production

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.onrender.com
```

#### Frontend Environment Variables
Update the `.env.production` file in the `client` directory:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 3. Deploy to Render

1. Log in to your Render account
2. Click "New" and select "Blueprint"
3. Connect your GitHub repository
4. Select the repository (PixelScribe)
5. Click "Apply" to deploy both services

### 4. Configure Environment Variables in Render

For the backend service, add these environment variables in the Render dashboard:

- `PORT`: 10000
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `NODE_ENV`: production
- `FRONTEND_URL`: Your frontend URL (e.g., https://your-frontend-url.onrender.com)

For the frontend service, add:

- `VITE_BACKEND_URL`: Your backend URL (e.g., https://your-backend-url.onrender.com)
- `VITE_RAZORPAY_KEY_ID`: Your Razorpay key ID

### 5. Deploy

1. Click "Apply" to deploy your services
2. Wait for the build and deployment to complete
3. Your application should now be live at the frontend URL

## Post-Deployment

1. Test all features to ensure they're working correctly
2. Set up a custom domain if needed
3. Configure SSL certificates (automatically handled by Render)
4. Set up monitoring and alerts

## Troubleshooting

- Check the logs in the Render dashboard for any errors
- Ensure all environment variables are correctly set
- Verify that your MongoDB Atlas database allows connections from Render's IP addresses
- Make sure your Cloudinary credentials are correct and have proper permissions
