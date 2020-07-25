# pip install requests
import requests
import json

# const req url
api_url = 'http://localhost:8080/send'

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
	"position": "x4",
	"player": 2
}

# getposition
get_position_data = {
    "API_KEY": "123456",
    "action": "getposition",
    "gameid": 1
}

# make request
data = requests.post(api_url, json = new_game_data)

# String data
print (f'\nString data: {data.text}')

# parse data
# result = json.loads(data)
# print (f'\nData: {result}')