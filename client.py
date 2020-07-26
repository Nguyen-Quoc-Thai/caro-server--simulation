# pip install requests
import requests

# const req url
api_url = 'http://localhost:8080/caro/send'

# newgame
new_game_data = {
    "API_KEY": "123456",
    "action": "newgame",
    "matrix": 9
}

# sendposition
send_position_data = {
	"API_KEY": "123456",
	"action": "sendposition",
	"position": "x7",
	"player": 1
}

# getposition
get_position_data = {
    "API_KEY": "123456",
    "action": "getposition",
    "gameid": 1
}

# make request
res = requests.post(api_url, json = get_position_data)

# parse data
data = res.json()
print (f'\nData: {data}')

# access field via keys
# print (f'\nStatus: {data["status"]}')