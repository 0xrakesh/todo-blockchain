network = input("Enter the blockchain network (for localhost/development just leave it blank):")
port = input("Enter the port number :")

network = "127.0.0.1" if len(network)==0 else network 

with open(".env","w") as file:
    file.write("network="+network)
    file.write("\n")
    file.write("port="+port)
    file.write("\n")

import os
os.system("npm install truffle dotenv")
os.system("truffle compile")
os.system("truflle migrate --reset")
os.system("cp build\contracts\TodoList.json app\src\TodoList.json")
