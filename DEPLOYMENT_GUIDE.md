# Tsunami Dashboard - Render Deployment Guide

## System Overview
Your Tsunami Dashboard is a Flask web application with:
- **Machine Learning Classification**: Random Forest model for tsunami prediction
- **AI-Powered Explanations**: Google Gemini API integration
- **Interactive Dashboard**: Real-time visualization and analysis
- **Web Interface**: HTML templates with modern UI

## Prerequisites
1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Step-by-Step Deployment Instructions

### Step 1: Prepare Your Repository
Your files are already properly configured:
- ✅ `app.py` - Main Flask application
- ✅ `requirements.txt` - Updated with correct dependencies
- ✅ `render.yaml` - Render configuration file
- ✅ `templates/` - HTML templates
- ✅ `static/` - CSS and JavaScript files
- ✅ Model files (`tsunami_rf_model.pkl`, `tsunami_label_encoder.pkl`)

### Step 2: Push to GitHub
1. Initialize git repository (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Render deployment"
   ```

2. Create a GitHub repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tsunami-dashboard.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy on Render

1. **Login to Render**: Go to [render.com](https://render.com) and sign in

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your tsunami dashboard repository

3. **Configure Deployment Settings**:
   - **Name**: `tsunami-dashboard` (or any name you prefer)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Choose "Free" tier for testing

4. **Set Environment Variables**:
   - Go to "Environment" tab
   - Add: `GEMINI_API_KEY` = `your_actual_gemini_api_key`
   - Add: `PYTHON_VERSION` = `3.11.0`

5. **Advanced Settings** (Optional):
   - **Auto-Deploy**: Enable to redeploy on git pushes
   - **Health Check Path**: `/` (your home route)

### Step 4: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to Render's environment variables

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Install dependencies from `requirements.txt`
   - Start your application with gunicorn
   - Provide a public URL

### Step 6: Verify Deployment

Once deployed, your dashboard will be available at:
`https://your-app-name.onrender.com`

Test these features:
- ✅ Dashboard loads correctly
- ✅ Classifier form works
- ✅ Predictions are generated
- ✅ Gemini API explanations work
- ✅ Static files (CSS/JS) load properly

## Troubleshooting Common Issues

### Build Failures
- **Large files**: Model files might cause timeout. Consider using Git LFS
- **Dependencies**: Check `requirements.txt` for correct versions
- **Python version**: Ensure compatible packages

### Runtime Issues
- **Model loading**: Verify `.pkl` files are properly committed
- **API errors**: Check Gemini API key is correctly set
- **Static files**: Ensure proper Flask static file configuration

### Performance Optimization
- **Model files**: Consider hosting models on cloud storage for faster deploys
- **Caching**: Add Redis for better performance (paid plans)
- **CDN**: Use Render's CDN for static assets

## File Structure Summary
```
tsunami-dashboard/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── render.yaml                     # Render configuration
├── tsunami_rf_model.pkl           # ML model file
├── tsunami_label_encoder.pkl      # Label encoder
├── tsunami_dataset.csv            # Dataset
├── templates/
│   └── index.html                 # Main template
├── static/
│   ├── css/                       # Stylesheets
│   └── js/                        # JavaScript files
└── DEPLOYMENT_GUIDE.md            # This guide
```

## Support & Monitoring

- **Logs**: Check Render dashboard for deployment and runtime logs
- **Metrics**: Monitor performance in Render dashboard
- **Updates**: Push to GitHub to trigger automatic redeployment
- **Scaling**: Upgrade to paid plans for better performance

## Cost Considerations

- **Free Tier**: 750 hours/month, sleeps after 15 minutes of inactivity
- **Paid Plans**: Start at $7/month for always-on service
- **Model Storage**: Large files might require paid storage plans

Your tsunami dashboard is now ready for professional deployment! 🌊📊 