import requests

access_token = 'YOUR_ACCESS_TOKEN'
post_id = 'YOUR_POST_ID'
url = f'https://graph.instagram.com/{post_id}/comments'
params = {
    'access_token': access_token,
    'fields': 'id,text,username,timestamp'
}

response = requests.get(url, params=params)
comments = response.json()

for comment in comments['data']:
    print(comment)

#___________

while 'paging' in comments and 'next' in comments['paging']:
    next_url = comments['paging']['next']
    response = requests.get(next_url)
    comments = response.json()
    for comment in comments['data']:
        print(comment)
