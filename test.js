const apiUrl = 'https://portfolio-backend-laniqgfzl-mahmdzscs-projects.vercel.app/api/projects';
const token = 'YOUR_TOKEN_HERE'; // Replace with your actual token

async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Token ${token}` // Replace with the correct authorization scheme if needed
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Handle the data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
