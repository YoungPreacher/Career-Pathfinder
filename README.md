# Career Pathfinder

A comprehensive web application that helps users discover their ideal career path through intelligent assessment and personalized recommendations.

## Features

### Frontend (React + Material-UI)
- **Interactive Assessment**: Multi-step career assessment with skills, preferences, and work style evaluation
- **Personalized Results**: Dynamic career recommendations based on assessment responses
- **Career Comparison**: Side-by-side comparison of multiple career paths
- **Detailed Insights**: Salary breakdowns, growth potential, work-life balance, and more
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Backend (Flask + Python)
- **AI-Powered Recommendations**: Intelligent career matching algorithm
- **Comprehensive Career Database**: 8 detailed career paths with real-world data
- **RESTful API**: Clean, documented endpoints for all functionality
- **Assessment Processing**: Analyzes user responses to provide personalized recommendations
- **Career Search**: Keyword-based career search functionality

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Start the Backend
```bash
cd backend
python app.py
```
The backend will run on `http://localhost:5000`

### 4. Start the Frontend
```bash
npm start
```
The frontend will run on `http://localhost:3000`

### 5. Access the Application
Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
Career-Pathfinder/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Main application pages
│   └── App.js             # Main application component
├── backend/               # Flask backend API
│   ├── app.py            # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   └── README.md         # Backend documentation
├── public/               # Static assets
└── package.json          # Frontend dependencies
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Career Recommendations
- `POST /api/recommend` - Get personalized career recommendations

### Career Information
- `GET /api/careers` - Get all available careers
- `GET /api/career/<career_name>` - Get detailed career information

### Career Comparison
- `POST /api/compare` - Compare multiple careers

### Career Search
- `GET /api/search?q=<query>` - Search careers by keyword

## Assessment Process

1. **Basic Information**: Current job title, years of experience, education level
2. **Skills & Experience**: Add relevant skills and technical expertise
3. **Interests & Preferences**: Work style, problem-solving preferences, salary expectations
4. **Work Environment**: Preferred work environment and work-life balance importance

## Career Matching Algorithm

The recommendation system uses a weighted scoring algorithm:

- **Skills Matching (40%)**: Matches user skills with career keywords
- **Salary Expectations (20%)**: Compares desired salary with career average
- **Work Style (15%)**: Matches work style preferences with career environment
- **Work Environment (15%)**: Aligns environment preferences with career options
- **Work-Life Balance (10%)**: Considers balance importance vs career balance

## Available Careers

1. **Software Engineer** - High demand, high salary potential
2. **Data Scientist** - Very high demand, excellent growth
3. **Product Manager** - High salary, leadership opportunities
4. **UX Designer** - Creative work, good work-life balance
5. **Marketing Manager** - Diverse industries, creative opportunities
6. **Data Analyst** - Growing field, good work-life balance
7. **Project Manager** - Leadership opportunities, transferable skills
8. **Sales Manager** - High earning potential, performance-based

## Development

### Frontend Development
```bash
npm start          # Start development server
npm run build      # Build for production
```

### Backend Development
```bash
cd backend
python app.py      # Start Flask development server
```

### Testing the API
```bash
# Health check
curl http://localhost:5000/api/health

# Get career recommendations
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"skills": ["JavaScript", "React"], "workStyle": "independent"}'
```

## Technologies Used

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios (for API calls)

### Backend
- Flask
- Flask-CORS
- Python 3.7+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
