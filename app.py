from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

# Load model and encoder
model = joblib.load('tsunami_rf_model.pkl')
label_encoder = joblib.load('tsunami_label_encoder.pkl')

app = Flask(__name__)

# Mapping dictionaries for user-friendly inputs
CAUSE_MAPPING = {
    'Earthquake': 0,
    'Landslide': 1,
    'Earthquake and Landslide': 2,
    'Volcano': 3,
    'Volcano and Landslide': 4,
    'Meteorological': 5,
    'Unknown': 6
}

CONTINENT_MAPPING = {
    'Asia': 0,
    'Europe': 1,
    'Other': 2
}

# Extended country mapping based on the notebook's continent classification
COUNTRY_MAPPING = {
    # Asian countries
    'Japan': 0, 'Indonesia': 1, 'Philippines': 2, 'India': 3, 'China': 4, 'Malaysia': 5,
    'Thailand': 6, 'Sri Lanka': 7, 'Vietnam': 8, 'Myanmar': 9, 'Bangladesh': 10, 'Taiwan': 11,
    'Pakistan': 12, 'Turkey': 13, 'Russia': 14, 'Iran': 15, 'Iraq': 16, 'South Korea': 17,
    'North Korea': 18, 'Israel': 19, 'Jordan': 20,
    
    # European countries
    'Greece': 21, 'Italy': 22, 'United Kingdom': 23, 'Portugal': 24, 'Spain': 25, 'France': 26,
    'Germany': 27, 'Norway': 28, 'Croatia': 29, 'Romania': 30, 'Albania': 31, 'Bulgaria': 32,
    'Sweden': 33, 'Finland': 34, 'Netherlands': 35, 'Ireland': 36, 'Cyprus': 37, 'Montenegro': 38,
    
    # Other countries (Americas, Africa, Oceania)
    'United States': 39, 'Canada': 40, 'Mexico': 41, 'Chile': 42, 'Peru': 43, 'Ecuador': 44,
    'Colombia': 45, 'Brazil': 46, 'Argentina': 47, 'Venezuela': 48, 'Guatemala': 49, 'Costa Rica': 50,
    'Nicaragua': 51, 'Honduras': 52, 'El Salvador': 53, 'Panama': 54, 'Haiti': 55, 'Dominican Republic': 56,
    'Jamaica': 57, 'Cuba': 58, 'Puerto Rico': 59, 'Trinidad and Tobago': 60,
    
    'Australia': 61, 'New Zealand': 62, 'Papua New Guinea': 63, 'Fiji': 64, 'Vanuatu': 65,
    'Solomon Islands': 66, 'Tonga': 67, 'Samoa': 68,
    
    'South Africa': 69, 'Morocco': 70, 'Algeria': 71, 'Tunisia': 72, 'Egypt': 73, 'Ethiopia': 74,
    'Kenya': 75, 'Tanzania': 76, 'Madagascar': 77, 'Mauritius': 78,
    
    # Pacific Ocean regions
    'Northwest Pacific Ocean': 79, 'North Pacific Ocean': 80, 'South Pacific Ocean': 81,
    'Central Pacific Ocean': 82, 'East Pacific Ocean': 83, 'West Pacific Ocean': 84,
    
    # Atlantic Ocean regions
    'North Atlantic Ocean': 85, 'South Atlantic Ocean': 86, 'Central Atlantic Ocean': 87,
    
    # Indian Ocean regions
    'Indian Ocean': 88, 'West Indian Ocean': 89, 'East Indian Ocean': 90,
    
    # Other regions
    'Mediterranean Sea': 91, 'Caribbean Sea': 92, 'Arctic Ocean': 93, 'Baltic Sea': 94,
    'Red Sea': 95
}

@app.route('/')
def home():
    return render_template('index.html', active_page='dashboard')

@app.route('/dashboard')
def dashboard():
    return render_template('index.html', active_page='dashboard')

@app.route('/classifier')
def classifier():
    return render_template('index.html', active_page='classifier')

@app.route('/predict', methods=['POST'])
def predict():
    # Store form data to preserve values
    form_data = {
        'month': request.form.get('month', ''),
        'magnitude': request.form.get('magnitude', ''),
        'latitude': request.form.get('latitude', ''),
        'longitude': request.form.get('longitude', ''),
        'depth': request.form.get('depth', ''),
        'intensity': request.form.get('intensity', ''),
        'country': request.form.get('country', ''),
        'cause': request.form.get('cause', ''),
        'continent': request.form.get('continent', '')
    }
    
    try:
        # Get form data
        month = int(request.form['month'])
        magnitude = float(request.form['magnitude'])
        latitude = float(request.form['latitude'])
        longitude = float(request.form['longitude'])
        depth = float(request.form['depth'])
        intensity = float(request.form['intensity'])
        
        # Handle text inputs for country, cause, and continent
        country_text = request.form['country'].strip()
        cause_text = request.form['cause'].strip()
        continent_text = request.form['continent'].strip()
        
        # Convert text to codes using mappings
        country_code = COUNTRY_MAPPING.get(country_text)
        cause_code = CAUSE_MAPPING.get(cause_text)
        continent_code = CONTINENT_MAPPING.get(continent_text)
        
        # Validate mappings
        if country_code is None:
            return render_template('index.html', 
                                 active_page='classifier', 
                                 form_data=form_data,
                                 result=f"Error: Unknown country '{country_text}'. Please check the spelling.")
        if cause_code is None:
            return render_template('index.html', 
                                 active_page='classifier',
                                 form_data=form_data, 
                                 result=f"Error: Unknown cause '{cause_text}'. Please select from the available options.")
        if continent_code is None:
            return render_template('index.html', 
                                 active_page='classifier',
                                 form_data=form_data, 
                                 result=f"Error: Unknown continent '{continent_text}'. Please select from the available options.")

        # Prepare input - IMPORTANT: Check the feature order matches the model training
        features = np.array([
            month, magnitude, latitude, longitude, depth,
            intensity, country_code, cause_code, continent_code
        ]).reshape(1, -1)
        
        # Debug: Print the features being sent to the model
        print(f"Debug - Features: {features}")
        print(f"Debug - Feature order: month={month}, magnitude={magnitude}, lat={latitude}, lng={longitude}, depth={depth}, intensity={intensity}, country={country_code}, cause={cause_code}, continent={continent_code}")

        # Predict
        prediction = model.predict(features)
        print(f"Debug - Raw prediction: {prediction}")
        
        # Get prediction probabilities to see confidence
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(features)
            print(f"Debug - Prediction probabilities: {probabilities}")
        
        predicted_label = label_encoder.inverse_transform(prediction)[0]
        print(f"Debug - Predicted label: {predicted_label}")

        return render_template('index.html', 
                             active_page='classifier',
                             form_data=form_data, 
                             result=predicted_label)

    except Exception as e:
        print(f"Debug - Error occurred: {e}")
        import traceback
        traceback.print_exc()
        return render_template('index.html', 
                             active_page='classifier',
                             form_data=form_data, 
                             result=f"Error: {e}")

if __name__ == '__main__':
    app.run(debug=True)
