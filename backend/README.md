# Career Pathfinder Backend

Flask backend API for the Career Pathfinder web application.

## Features

- **Career Recommendations**: AI-powered career matching based on assessment data
- **Career Database**: Comprehensive database of 8 career paths with detailed information
- **Assessment Processing**: Analyzes user assessment data to provide personalized recommendations
- **Career Comparison**: Side-by-side comparison of multiple careers
- **Career Search**: Search careers by keywords and skills
- **RESTful API**: Clean, documented API endpoints

## API Endpoints

### Health Check
- `GET /api/health` - Check API status and available careers

### Career Recommendations
- `POST /api/recommend` - Get personalized career recommendations based on assessment data

### Career Information
- `GET /api/careers` - Get all available careers
- `GET /api/career/<career_name>` - Get detailed information about a specific career

### Career Comparison
- `POST /api/compare` - Compare multiple careers side by side

### Career Search
- `GET /api/search?q=<query>` - Search careers by keyword

## Setup Instructions

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask application**:
   ```bash
   python app.py
   ```

3. **Access the API**:
   - The API will be available at `http://localhost:5000`
   - Health check: `http://localhost:5000/api/health`

## Assessment Data Format

The `/api/recommend` endpoint expects assessment data in the following format:

```json
{
  "currentJobTitle": "Software Developer",
  "yearsExperience": "3",
  "education": "bachelors",
  "skills": ["JavaScript", "React", "Node.js", "Problem Solving"],
  "problemSolving": 4,
  "workStyle": "balanced",
  "workEnvironment": "hybrid",
  "salaryExpectation": [60000, 120000],
  "workLifeBalance": 4
}
```

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

To run in development mode with auto-reload:

```bash
export FLASK_ENV=development
python app.py
```

## Testing

Test the API endpoints using curl or any API client:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all careers
curl http://localhost:5000/api/careers

# Get career recommendations
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"skills": ["JavaScript", "React"], "workStyle": "independent"}'
``` 