import requests
import json

def test_backend():
    base_url = "http://localhost:5000"
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/api/health")
        print("Health check:", response.status_code)
        if response.status_code == 200:
            print("✅ Backend is running!")
            print("Response:", response.json())
        else:
            print("❌ Backend health check failed")
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running. Please start it with: python app.py")
        return
    
    # Test careers endpoint
    try:
        response = requests.get(f"{base_url}/api/careers")
        print("\nCareers endpoint:", response.status_code)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Found {data['total_count']} careers")
            print("Available careers:", data['careers'])
        else:
            print("❌ Careers endpoint failed")
    except Exception as e:
        print(f"❌ Error testing careers endpoint: {e}")
    
    # Test recommendation endpoint
    test_data = {
        "skills": ["JavaScript", "React", "Problem Solving"],
        "workStyle": "independent",
        "workEnvironment": "remote",
        "salaryExpectation": [60000, 120000],
        "workLifeBalance": 4
    }
    
    try:
        response = requests.post(
            f"{base_url}/api/recommend",
            headers={"Content-Type": "application/json"},
            data=json.dumps(test_data)
        )
        print("\nRecommendation endpoint:", response.status_code)
        if response.status_code == 200:
            data = response.json()
            print("✅ Got recommendations!")
            print(f"Found {len(data['recommendations'])} recommendations")
            for rec in data['recommendations']:
                print(f"- {rec['career_name']} (Score: {rec['match_score']})")
        else:
            print("❌ Recommendation endpoint failed")
            print("Response:", response.text)
    except Exception as e:
        print(f"❌ Error testing recommendation endpoint: {e}")

if __name__ == "__main__":
    test_backend() 