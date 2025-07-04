# Tsunami Dashboard: Comparing Asian and European Countries

An interactive web application for comprehensive tsunami data analysis and event classification, developed for **A242_STTHK3033 Information Visualization** course assignment. This project combines advanced data visualization through Power BI dashboards with machine learning-powered tsunami event classification.

## 🚀 Live Demo

**🌐 [View Live Application](https://tsunami-analysis-dashboard-and.onrender.com/)**

Experience the full interactive dashboard with real-time tsunami classification and AI-powered explanations!

## 🌊 Project Overview

This dashboard provides detailed analysis and comparison of tsunami events between Asian and European countries, featuring:

- **Interactive Power BI Dashboard**: Multi-page visualization comparing global tsunami patterns
- **Machine Learning Classification**: AI-powered tsunami event validity prediction
- **Comprehensive Analysis**: Historical tsunami data from 1800-present with 1,796+ events
- **Regional Comparison**: Focused analysis on Asian vs European tsunami patterns

## 📊 Dashboard Features

### Power BI Visualizations

![127 0 0 1_5000_ (8)](https://github.com/user-attachments/assets/7d57f681-760f-4741-a5e5-b410836b99cc)

**Page 1: Global Overview**
- Global tsunami count: **1.23K events**
- Highest recorded magnitude: **9.50**
- Interactive world map showing tsunami distribution by region
- Temporal analysis with yearly trends (1900-2020)
- Damage level analysis by region (Extreme, Limited, Moderate, Severe)
- Monthly tsunami occurrence patterns

![127 0 0 1_5000_ (11)](https://github.com/user-attachments/assets/f36b5c14-b374-4c74-b5e8-21c01f3ec536)

**Page 2: Asian Countries Analysis**
- Total Asian tsunami events: **473**
- Country-wise breakdown featuring Japan (160), Indonesia (118), Russia (79)
- Tsunami causes analysis (87.95% Earthquake-caused)
- Magnitude categories and event validity distribution
- Interactive map focused on Asian regions

![127 0 0 1_5000_ (12)](https://github.com/user-attachments/assets/8f4ef3f5-213b-42e2-b7e9-108a10485380)

**Page 3: European Countries Analysis**
- Total European tsunami events: **114**
- Country-wise breakdown led by Greece (50), Italy (24), Norway (19)
- Regional cause analysis with detailed breakdowns
- Magnitude categories and event validity patterns
- European-focused geographical visualization

### Key Insights from Dashboard

1. **Regional Distribution**: Asia experiences significantly more tsunami events (473) compared to Europe (114)
2. **Primary Causes**: Earthquakes are the dominant cause (87.95% in Asia, 57.89% in Europe)
3. **Top Affected Countries**: 
   - Asia: Japan, Indonesia, Russia, Philippines, China
   - Europe: Greece, Italy, Norway, Portugal, Spain
4. **Seasonal Patterns**: Peak tsunami activity in August (122 events) and November (117 events)
5. **Magnitude Analysis**: Most events fall in moderate magnitude categories

## 🤖 Machine Learning Classification

![127 0 0 1_5000_classifier (1)](https://github.com/user-attachments/assets/9b11281c-2533-493d-831c-8a38ba266277)


### Model Specifications
- **Algorithm**: Random Forest Classifier
- **Accuracy**: 77.08% (improved from base 57.88%)
- **Features**: 9 key parameters
- **Classes**: 5 tsunami validity categories

### Classification Categories
1. **Definite Tsunami** - Confirmed tsunami events
2. **Probable Tsunami** - Likely tsunami events with high confidence
3. **Questionable Tsunami** - Uncertain events requiring verification
4. **Very Doubtful Tsunami** - Low confidence events
5. **Seiche or Inland Disturbance** - Non-tsunami water disturbances

### Input Features
- Month of occurrence (1-12)
- Earthquake magnitude (3.7-9.5 Richter scale)
- Geographic coordinates (Latitude/Longitude)
- Country/Region (96 supported locations)
- Earthquake depth (0-700 km)
- Tsunami intensity (-5 to 10 scale)
- Primary cause (7 categories)
- Continental region (Asia/Europe/Other)

## 🧠 AI-Powered Explanations

### Gemini AI Integration
Our system now includes **AI-generated explanations** powered by Gemini 2.0 Flash model API that provide detailed insights into each classification decision:


## 🚀 Setup and Installation

### Prerequisites
- Python 3.7+
- Flask web framework
- Power BI account (for dashboard access)
- Gemini API key (for AI explanations)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Tsunami Dashboard"
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure Gemini API**
Get your API key from [Gemini](https://ai.google.dev/gemini-api/docs) and set it as an environment variable:

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your-actual-api-key-here"
```

**Windows (Command Prompt):**
```cmd
set GEMINI_API_KEY=your-actual-api-key-here
```

**macOS/Linux:**
```bash
export GEMINI_API_KEY="your-actual-api-key-here"
```

4. **Verify model files**
Ensure these files are present:
- `tsunami_rf_model.pkl` - Trained Random Forest model
- `tsunami_label_encoder.pkl` - Label encoder for classifications
- `tsunami_dataset.csv` - Historical tsunami data

5. **Run the application**
```bash
python app.py
```

6. **Access the dashboard**
- **Local Development**: Navigate to `http://localhost:5000` in your web browser
- **Live Version**: Visit [https://tsunami-analysis-dashboard-and.onrender.com/](https://tsunami-analysis-dashboard-and.onrender.com/)

## 📱 Usage Guide

### Dashboard Navigation
- **Dashboard Tab**: View comprehensive Power BI visualizations
- **Classifier Tab**: Access machine learning prediction tool

### Making Classifications
1. Fill in the event parameters form:
   - Select month and tsunami cause
   - Enter seismic data (magnitude, depth, intensity)
   - Specify geographic location (lat/lng, country)
2. Click "Classify Tsunami Event"
3. Review prediction results with confidence scores
4. **Read the AI explanation** to understand why the model made this prediction and how each input feature influenced the result

## 🏗️ Project Structure

```
Tsunami Dashboard/
├── app.py                          # Flask web application
├── requirements.txt                # Python dependencies
├── tsunami_dataset.csv             # Historical tsunami data
├── tsunami_rf_model.pkl            # Trained ML model
├── tsunami_label_encoder.pkl       # Label encoder
├── tsunami_classification_system.ipynb # Model development notebook
├── templates/
│   └── index.html                  # Main web interface
├── static/
│   ├── css/style.css              # Styling
│   └── js/script.js               # JavaScript functionality
└── A242_STTHK3033 ASSIGNMENT 2.docx # Assignment documentation
```

## 📈 Technical Implementation

### Power BI Integration
- Embedded Power BI report with interactive visualizations
- Direct integration through iframe embedding
- Real-time data connectivity for dashboard updates

### Machine Learning Pipeline
- Feature engineering from raw tsunami data
- Random Forest model with optimized hyperparameters
- Comprehensive validation with cross-validation techniques
- Support for 96 countries/regions and 7 tsunami causes

### AI Explanation System
- Gemini API integration for intelligent explanations
- Contextual analysis of input features and model decisions
- Scientific reasoning based on seismic and tsunami principles
- Educational explanations suitable for both experts and general users


### Web Application Architecture
- Flask backend with RESTful API endpoints
- Responsive frontend with Bootstrap styling
- Form validation and error handling
- Real-time prediction with confidence scoring
- AI-powered explanation generation

## 🎯 API Endpoints

- `GET /` - Main dashboard interface
- `GET /dashboard` - Power BI dashboard view
- `GET /classifier` - ML classification interface
- `POST /predict` - Tsunami event classification API

## 📊 Data Sources

- Historical tsunami database (1800-present)
- Seismic event records from global monitoring networks
- Geographic and geological datasets
- Regional classification systems

## 🔬 Research Applications

This system supports:
- **Disaster Risk Assessment**: Evaluate tsunami probability for coastal regions
- **Historical Analysis**: Study patterns in tsunami occurrence and impact
- **Comparative Studies**: Regional differences in tsunami characteristics
- **Early Warning Systems**: Assist in rapid event classification
- **Educational Purposes**: Interactive learning about tsunami science

## 📝 Assignment Context

Developed for **STTHK3033 Information Visualization** (Assignment 2)
- **Institution**: University Utara Malaysia
- **Semester**: A242 Semester 6
- **Focus**: Comparative analysis of Asian and European tsunami patterns
- **Methodology**: Interactive dashboard design with machine learning integration

## 🤝 Contributing

This project welcomes contributions for:
- Enhanced visualization features
- Improved machine learning models
- Additional regional analysis
- Data source integration
- User interface improvements

## 📄 License

This project is developed for academic purposes as part of university coursework.

---

**Note**: The Power BI dashboard requires appropriate access permissions. Ensure you have the necessary credentials to view the embedded visualizations. 
