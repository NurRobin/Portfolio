import requests
import time

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class getValues():

    def __init__(self):
        #item array
        item = ["Location_powerProduced","Location_powerOut","Location_powerBuffered","Location_powerConsumed","Location_powerConsumedFromGrid","Location_powerConsumedFromStorage","Location_powerDirectConsumed","EVStation_modeStation", "BatteryConverter_stateOfCharge"]
        self.item = item
        self.getValue()
    def getValue(self):
        #print time stamp and placeholder for values
        print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
        print("-----------------------------------------------------")
        for item in self.item:
            headers = {
                'accept': 'text/plain',
                'API_TOKEN': 'oh.Website.sDWxxR7STynPPKRYLKQiOaYwL4zRrlunQU0hupAUIozyY0xMLGDyBR52PMZoJRu3hLXCpJW9RADAq8NskFxA',
            }
            response = requests.get('http://openhabian:8080/rest/items/'+ item +'/state', headers=headers)
            #print value in green if it changed since last run, red if it didn't
            if response.text == open('values/' + item + ".txt", "r").read():
                print(f"{bcolors.FAIL} + {item}: {response.text}{bcolors.ENDC}")
            else:
                print(f"{bcolors.OKGREEN} - {item}: {response.text}{bcolors.ENDC}")
            #save string in file
            with open('values/' + item + '.txt', 'w') as f:
                f.write(response.text)
        print("-----------------------------------------------------")
        #wait 3 seconds and repeat
        time.sleep(3)
        self.getValue()

getValues()