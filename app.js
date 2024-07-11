// Extract code from URL
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
  // Exchange the code for an access token
  fetch(`https://graph.facebook.com/v11.0/oauth/access_token?client_id=803246971960239&redirect_uri=https://jenusany.github.io/Instagram-comment-analysis&client_secret=c19298b4ce75926bf2dc0177b77e5912&code=${code}`)
    .then(response => response.json())
    .then(data => {
      const accessToken = data.access_token;
      console.log('Access Token:', accessToken);

      // Use the access token to fetch user data
      fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`)
        .then(response => response.json())
        .then(userData => {
          console.log('User Data:', userData);
        });
    })
    .catch(error => console.error('Error:', error));
}
