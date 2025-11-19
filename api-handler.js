const API = {
  baseURL: "http://localhost/UTS",

  async request(endpoint, data = {}) {
    try {
      const fullUrl = `${this.baseURL}/${endpoint}`;
      console.log('API Request to:', fullUrl, 'Data:', data);
      
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
        mode: 'cors'
      });

      console.log('API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      return result;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  },

  register(fullname, email, password) {
    return this.request("register.php", { fullname, email, password });
  },

  login(email, password) {
    return this.request("login.php", { email, password });
  }
};
