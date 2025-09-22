# PixelScribe API Documentation

## Overview
PixelScribe uses the **ClipDrop API** for all AI image processing features. ClipDrop is a professional AI API service by Stability AI that provides various image manipulation capabilities.

## APIs Used

### ClipDrop API (Primary)
- **Provider**: Stability AI
- **Base URL**: `https://clipdrop-api.co`
- **Authentication**: API Key via `x-api-key` header
- **Environment Variable**: `CLIPDROP_API`

#### Endpoints Implemented:

1. **Text to Image Generation**
   - **Endpoint**: `/text-to-image/v1`
   - **Method**: POST
   - **Purpose**: Generate images from text prompts
   - **Status**: ✅ Fully Implemented

2. **Image Upscaling**
   - **Endpoint**: `/image-upscaling/v1/upscale`
   - **Method**: POST
   - **Purpose**: Enhance and upscale images up to 4x resolution
   - **Status**: ✅ Fully Implemented

3. **Remove Background**
   - **Endpoint**: `/remove-background/v1`
   - **Method**: POST
   - **Purpose**: Remove backgrounds from images
   - **Status**: ✅ Fully Implemented

4. **Replace Background**
   - **Endpoint**: `/replace-background/v1`
   - **Method**: POST
   - **Purpose**: Replace backgrounds with AI-generated scenes from text prompts
   - **Status**: ✅ Fully Implemented

5. **Reimagine**
   - **Endpoint**: `/reimagine/v1/reimagine`
   - **Method**: POST
   - **Purpose**: Create creative variations of images
   - **Status**: ✅ Fully Implemented

6. **Uncrop**
   - **Endpoint**: `/uncrop/v1`
   - **Method**: POST
   - **Purpose**: Extend images beyond their borders with AI-generated content
   - **Status**: ✅ Fully Implemented

7. **Remove Text**
   - **Endpoint**: `/remove-text/v1`
   - **Method**: POST
   - **Purpose**: Remove text and watermarks from images
   - **Status**: ✅ Fully Implemented

8. **Cleanup**
   - **Endpoint**: `/cleanup/v1`
   - **Method**: POST
   - **Purpose**: Remove unwanted objects and imperfections
   - **Status**: ✅ Fully Implemented

## API Integration Details

### Request Format
All ClipDrop APIs use `multipart/form-data` with:
- `image_file`: The image buffer
- Additional parameters as needed (e.g., `style` for style transfer)

### Response Format
- **Success**: Binary image data (arraybuffer)
- **Error**: JSON with error details
- **Conversion**: Binary data converted to base64 for frontend display

### Error Handling
Each endpoint includes:
1. **Primary API Call**: Attempts ClipDrop API
2. **Fallback**: Demo implementation if API fails
3. **Credit Deduction**: Always deducts user credits
4. **User Feedback**: Clear success/error messages

## Authentication & Credits
- **User Authentication**: Required for all features
- **Credit System**: Each operation costs 1 credit
- **Credit Check**: Validates sufficient balance before processing
- **Balance Update**: Automatically deducts credits after successful operations

## Environment Variables Required
```env
CLIPDROP_API=your_clipdrop_api_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=4000
```

## API Endpoints Summary

| Feature | Backend Endpoint | ClipDrop API | Status |
|---------|------------------|--------------|--------|
| Text to Image | `/api/image/generate-image` | `/text-to-image/v1` | ✅ Working |
| Image Upscaling | `/api/enhance/enhance-image` | `/image-upscaling/v1/upscale` | ✅ Updated |
| Remove Background | `/api/enhance/remove-background` | `/remove-background/v1` | ✅ Updated |
| Replace Background | `/api/enhance/replace-background` | `/replace-background/v1` | ✅ New |
| Reimagine | `/api/enhance/reimagine` | `/reimagine/v1/reimagine` | ✅ New |
| Uncrop | `/api/enhance/uncrop` | `/uncrop/v1` | ✅ New |
| Remove Text | `/api/enhance/remove-text` | `/remove-text/v1` | ✅ New |
| Cleanup | `/api/enhance/cleanup` | `/cleanup/v1` | ✅ New |

## Frontend Features Updated

| Feature Page | Route | ClipDrop Integration |
|--------------|-------|---------------------|
| Text to Image | `/text-to-image` | ✅ Already working |
| Image Upscaling | `/image-enhancer` | ✅ Updated to use proper API |
| Remove Background | `/background-remover` | ✅ Updated to use proper API |
| Replace Background | `/replace-background` | ✅ New feature |
| Reimagine | `/reimagine` | ✅ New feature |
| Uncrop | `/uncrop` | ✅ New feature |
| Remove Text | `/remove-text` | ✅ New feature |
| Cleanup | `/cleanup` | ✅ New feature |

## Notes
- All 8 ClipDrop API features are now properly integrated
- Each feature has proper user authentication and credit validation
- No fallback implementations - direct ClipDrop API integration
- All APIs return consistent response format for frontend integration
- Features component updated to show all 8 ClipDrop capabilities
