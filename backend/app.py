from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Career database with detailed information
CAREER_DATABASE = {
    'Software Engineer': {
        'description': 'Develop software applications and systems using programming languages and development tools.',
        'salary': {
            'entry': 65000,
            'mid': 95000,
            'senior': 130000,
            'average': 95000
        },
        'skills': ['Programming', 'Problem Solving', 'Team Collaboration', 'System Design', 'Algorithms'],
        'education': 'Bachelor\'s in Computer Science or related field',
        'workEnvironment': 'Office/Hybrid/Remote',
        'growth': 4.5,
        'workLifeBalance': 3.5,
        'demand': 'High',
        'locations': ['San Francisco', 'New York', 'Seattle', 'Austin', 'Boston'],
        'pros': ['High salary potential', 'Remote work options', 'Continuous learning', 'Creative problem solving'],
        'cons': ['Long hours sometimes', 'Constant technology changes', 'High stress', 'Imposter syndrome'],
        'keywords': ['programming', 'coding', 'software', 'development', 'technical', 'problem solving']
    },
    'Data Scientist': {
        'description': 'Analyze complex data sets to help organizations make better decisions.',
        'salary': {
            'entry': 70000,
            'mid': 100000,
            'senior': 140000,
            'average': 103000
        },
        'skills': ['Statistics', 'Machine Learning', 'Python', 'Data Visualization', 'SQL'],
        'education': 'Master\'s in Data Science, Statistics, or related field',
        'workEnvironment': 'Office/Hybrid/Remote',
        'growth': 4.8,
        'workLifeBalance': 4.0,
        'demand': 'Very High',
        'locations': ['San Francisco', 'New York', 'Seattle', 'Boston', 'Austin'],
        'pros': ['High demand', 'Good work-life balance', 'Intellectual challenge', 'High salary'],
        'cons': ['Requires advanced education', 'Can be isolating', 'High expectations', 'Complex field'],
        'keywords': ['data', 'analytics', 'statistics', 'machine learning', 'python', 'analysis']
    },
    'Product Manager': {
        'description': 'Lead product development from conception to launch, working with cross-functional teams.',
        'salary': {
            'entry': 75000,
            'mid': 110000,
            'senior': 150000,
            'average': 112000
        },
        'skills': ['Leadership', 'Strategic Thinking', 'Communication', 'Market Analysis', 'Project Management'],
        'education': 'Bachelor\'s degree, MBA preferred',
        'workEnvironment': 'Office/Hybrid',
        'growth': 4.2,
        'workLifeBalance': 3.0,
        'demand': 'High',
        'locations': ['San Francisco', 'New York', 'Seattle', 'Austin', 'Boston'],
        'pros': ['High salary potential', 'Leadership opportunities', 'Strategic impact', 'Varied work'],
        'cons': ['High stress', 'Long hours', 'Accountability for failures', 'Political challenges'],
        'keywords': ['product', 'management', 'leadership', 'strategy', 'communication', 'business']
    },
    'UX Designer': {
        'description': 'Create user-centered designs for digital products and services.',
        'salary': {
            'entry': 60000,
            'mid': 85000,
            'senior': 120000,
            'average': 88000
        },
        'skills': ['User Research', 'Design Thinking', 'Prototyping', 'Visual Design', 'User Testing'],
        'education': 'Bachelor\'s in Design, HCI, or related field',
        'workEnvironment': 'Office/Hybrid/Remote',
        'growth': 4.0,
        'workLifeBalance': 4.2,
        'demand': 'High',
        'locations': ['San Francisco', 'New York', 'Seattle', 'Austin', 'Los Angeles'],
        'pros': ['Creative work', 'Good work-life balance', 'Growing field', 'User-focused'],
        'cons': ['Subjective feedback', 'Design by committee', 'Constant iteration', 'Client demands'],
        'keywords': ['design', 'user experience', 'ux', 'ui', 'creative', 'user research']
    },
    'Marketing Manager': {
        'description': 'Develop and execute marketing strategies to promote products and services.',
        'salary': {
            'entry': 55000,
            'mid': 80000,
            'senior': 110000,
            'average': 82000
        },
        'skills': ['Digital Marketing', 'Analytics', 'Communication', 'Strategy', 'Campaign Management'],
        'education': 'Bachelor\'s in Marketing, Business, or related field',
        'workEnvironment': 'Office/Hybrid',
        'growth': 3.8,
        'workLifeBalance': 3.5,
        'demand': 'Medium',
        'locations': ['New York', 'Los Angeles', 'Chicago', 'Boston', 'San Francisco'],
        'pros': ['Creative opportunities', 'Good work-life balance', 'Diverse industries', 'Fast-paced'],
        'cons': ['Results-driven pressure', 'Budget constraints', 'Fast-changing trends', 'Long hours'],
        'keywords': ['marketing', 'communication', 'strategy', 'analytics', 'campaign', 'business']
    },
    'Data Analyst': {
        'description': 'Collect, process, and analyze data to help organizations make informed decisions.',
        'salary': {
            'entry': 55000,
            'mid': 75000,
            'senior': 95000,
            'average': 75000
        },
        'skills': ['SQL', 'Excel', 'Data Visualization', 'Statistical Analysis', 'Reporting'],
        'education': 'Bachelor\'s in Statistics, Mathematics, or related field',
        'workEnvironment': 'Office/Hybrid/Remote',
        'growth': 4.2,
        'workLifeBalance': 4.0,
        'demand': 'High',
        'locations': ['New York', 'San Francisco', 'Chicago', 'Boston', 'Austin'],
        'pros': ['Good work-life balance', 'Growing field', 'Clear career path', 'Remote options'],
        'cons': ['Can be repetitive', 'Limited creativity', 'Data quality issues', 'Technical debt'],
        'keywords': ['data', 'analysis', 'excel', 'sql', 'reporting', 'analytics']
    },
    'Project Manager': {
        'description': 'Plan, execute, and close projects while managing teams and resources.',
        'salary': {
            'entry': 60000,
            'mid': 85000,
            'senior': 120000,
            'average': 88000
        },
        'skills': ['Project Planning', 'Team Leadership', 'Risk Management', 'Communication', 'Agile'],
        'education': 'Bachelor\'s degree, PMP certification preferred',
        'workEnvironment': 'Office/Hybrid',
        'growth': 3.9,
        'workLifeBalance': 3.2,
        'demand': 'High',
        'locations': ['New York', 'Chicago', 'San Francisco', 'Boston', 'Atlanta'],
        'pros': ['Leadership opportunities', 'Varied projects', 'Good salary', 'Transferable skills'],
        'cons': ['High stress', 'Accountability', 'Long hours', 'Political challenges'],
        'keywords': ['project', 'management', 'leadership', 'planning', 'coordination', 'agile']
    },
    'Sales Manager': {
        'description': 'Lead sales teams and develop strategies to meet revenue targets.',
        'salary': {
            'entry': 50000,
            'mid': 80000,
            'senior': 120000,
            'average': 83000
        },
        'skills': ['Sales Strategy', 'Team Leadership', 'Negotiation', 'Communication', 'CRM'],
        'education': 'Bachelor\'s in Business, Marketing, or related field',
        'workEnvironment': 'Office/Field',
        'growth': 3.5,
        'workLifeBalance': 2.8,
        'demand': 'Medium',
        'locations': ['New York', 'Los Angeles', 'Chicago', 'Dallas', 'Atlanta'],
        'pros': ['High earning potential', 'Performance-based rewards', 'Networking', 'Fast-paced'],
        'cons': ['High pressure', 'Long hours', 'Unpredictable income', 'Travel required'],
        'keywords': ['sales', 'leadership', 'negotiation', 'communication', 'business', 'revenue']
    }
}

def calculate_career_match_score(assessment_data, career):
    """Calculate how well a career matches the user's assessment data"""
    score = 0
    career_data = CAREER_DATABASE[career]
    
    # Skills matching (40% weight)
    user_skills = set(skill.lower() for skill in assessment_data.get('skills', []))
    career_keywords = set(career_data['keywords'])
    skill_match = len(user_skills.intersection(career_keywords)) / max(len(career_keywords), 1)
    score += skill_match * 40
    
    # Salary expectations (20% weight)
    user_salary_min = assessment_data.get('salaryExpectation', [500, 50000])[0]
    career_avg_salary = career_data['salary']['average']
    if user_salary_min <= career_avg_salary:
        score += 20
    else:
        # Reduce score if salary expectation is much higher
        score += max(0, 20 - (user_salary_min - career_avg_salary) / 10000)
    
    # Work style preference (15% weight)
    user_work_style = assessment_data.get('workStyle', 'balanced')
    if user_work_style == 'independent' and 'Remote' in career_data['workEnvironment']:
        score += 15
    elif user_work_style == 'collaborative' and 'Office' in career_data['workEnvironment']:
        score += 15
    elif user_work_style == 'balanced':
        score += 10
    
    # Work environment preference (15% weight)
    user_env = assessment_data.get('workEnvironment', 'hybrid')
    if user_env in career_data['workEnvironment']:
        score += 15
    
    # Work-life balance importance (10% weight)
    user_balance_importance = assessment_data.get('workLifeBalance', 3)
    career_balance = career_data['workLifeBalance']
    if user_balance_importance >= 4 and career_balance >= 4:
        score += 10
    elif user_balance_importance <= 2 and career_balance <= 3:
        score += 10
    else:
        score += 5
    
    return min(100, score)

def get_career_recommendations(assessment_data):
    """Get personalized career recommendations based on assessment data"""
    career_scores = {}
    
    for career in CAREER_DATABASE.keys():
        score = calculate_career_match_score(assessment_data, career)
        career_scores[career] = score
    
    # Sort careers by score and return top recommendations
    sorted_careers = sorted(career_scores.items(), key=lambda x: x[1], reverse=True)
    
    # Return top 5 careers with their scores
    recommendations = []
    for career, score in sorted_careers[:5]:
        career_info = CAREER_DATABASE[career].copy()
        career_info['match_score'] = round(score, 1)
        career_info['career_name'] = career
        recommendations.append(career_info)
    
    return recommendations

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'careers_available': len(CAREER_DATABASE)
    })

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    """Get career recommendations based on assessment data"""
    try:
        assessment_data = request.json
        
        if not assessment_data:
            return jsonify({'error': 'No assessment data provided'}), 400
        
        # Get recommendations
        recommendations = get_career_recommendations(assessment_data)
        
        # Add assessment summary
        assessment_summary = {
            'total_careers_evaluated': len(CAREER_DATABASE),
            'assessment_date': datetime.now().isoformat(),
            'user_profile': {
                'skills_count': len(assessment_data.get('skills', [])),
                'education_level': assessment_data.get('education', 'Not specified'),
                'work_style': assessment_data.get('workStyle', 'Not specified'),
                'work_environment': assessment_data.get('workEnvironment', 'Not specified'),
                'salary_range': assessment_data.get('salaryExpectation', [0, 0])
            }
        }
        
        return jsonify({
            'recommendations': recommendations,
            'summary': assessment_summary,
            'success': True
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to process assessment data',
            'details': str(e)
        }), 500

@app.route('/api/careers', methods=['GET'])
def get_all_careers():
    """Get all available careers"""
    return jsonify({
        'careers': list(CAREER_DATABASE.keys()),
        'total_count': len(CAREER_DATABASE)
    })

@app.route('/api/career/<career_name>', methods=['GET'])
def get_career_details(career_name):
    """Get detailed information about a specific career"""
    if career_name in CAREER_DATABASE:
        return jsonify({
            'career': CAREER_DATABASE[career_name],
            'success': True
        })
    else:
        return jsonify({
            'error': 'Career not found',
            'available_careers': list(CAREER_DATABASE.keys())
        }), 404

@app.route('/api/compare', methods=['POST'])
def compare_careers():
    """Compare multiple careers side by side"""
    try:
        data = request.json
        career_names = data.get('careers', [])
        
        if not career_names:
            return jsonify({'error': 'No careers specified for comparison'}), 400
        
        comparison_data = []
        for career_name in career_names:
            if career_name in CAREER_DATABASE:
                career_data = CAREER_DATABASE[career_name].copy()
                career_data['name'] = career_name
                comparison_data.append(career_data)
        
        return jsonify({
            'comparison': comparison_data,
            'success': True
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to compare careers',
            'details': str(e)
        }), 500

@app.route('/api/search', methods=['GET'])
def search_careers():
    """Search careers by keyword"""
    query = request.args.get('q', '').lower()
    
    if not query:
        return jsonify({'error': 'No search query provided'}), 400
    
    results = []
    for career_name, career_data in CAREER_DATABASE.items():
        # Search in career name, description, skills, and keywords
        searchable_text = f"{career_name} {career_data['description']} {' '.join(career_data['skills'])} {' '.join(career_data['keywords'])}".lower()
        
        if query in searchable_text:
            results.append({
                'name': career_name,
                'description': career_data['description'],
                'match_score': searchable_text.count(query)  # Simple relevance scoring
            })
    
    # Sort by relevance
    results.sort(key=lambda x: x['match_score'], reverse=True)
    
    return jsonify({
        'results': results,
        'query': query,
        'total_results': len(results)
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 