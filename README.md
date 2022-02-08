# PUTM_EV_TELEMETRY_SOFTWARE_2022

Web Application that allows read and display data from CAN  


## Running Aplication
To start Backend and Frontend site run `start.sh`

To manually run Backend and Frontend follow instructions below:

To start Serial Websocket server:  
On Windows x64: Start Serial Websocket `.\serialWebsocket\serial-port-json-server-1.96_windows_amd64\serial-port-json-server.exe`  
On Windows x32: Start Serial Websocket `.\serialWebsocket\serial-port-json-server-1.96_windows_386\serial-port-json-server.exe`  
On Linux x32: Start Serial Websocket `.\serialWebsocket\serial-port-json-server-1.96_linux_386\serial-port-json-server`  
On Linux x64: Start Serial Websocket `.\serialWebsocket\serial-port-json-server-1.96_linux_amd64\serial-port-json-server`  
On ARM: Start Serial Websocket `.\serialWebsocket\serial-port-json-server-1.96_linux_arm\serial-port-json-server`  


Installing on Raspberry Pi:  

Do a wget `https://github.com/chilipeppr/serial-port-json-server/releases/download/v1.96/serial-port-json-server-1.96_linux_arm.tar.gz` from the command line  
Then `gzip -d serial-port-json-server-1.96_linux_arm.tar.gz`  
Then `tar -xvf serial-port-json-server-1.96_linux_arm.tar`  
Then `cd serial-port-json-server-1.96_linux_arm`  
Then `chmod 777 serial-port-json-server` to make sure it's executable  
Then `sudo ./serial-port-json-server -createstartupscript`  
Then `run sudo /etc/init.d/serial-port-json-server start`  
You will now have SPJS (Serial Port JSON Server) start automatically on boot of your Raspberry Pi  

To start Web Application go to `./telemetry_app/`  
To compile use: `npm install` (needed internet connection) with Node.js installed  
To run server: `npm run serve`  


## Assumptions / Functions

- Show info from CAN on Web Application
- Frequency
- All on one Screen
- live graphs
- Live widgets
- sec screen - logs error
- Horizontal line thru all charts showing values
- horizontal time axis
- zooming whole application
- Export to CSV / JSON
- Fast serial data processing
- slower gui refreshrate


## Parameters GUI Widgets

- [x] RPM
- [x] RMS+-
- [x] Temperatures
- [x] Battery
- [x] Cells
- [x] RTD
- [x] Brakes
- [x] Tires
- [x] HV
- [x] Dampers
- [x] Acceleration
- [ ] ~~Gyro~~
- [ ] ~~Mag~~
- [x] Yaw + Pitch
- [x] Steering


## Parameters

- RPM
- RMS+-
- Temp1
- Temp2
- StateofCharge%
- 6 cell voltage
- RTD
- Brake Signal
- RPM of Wheels
- InMonoTemp
- HV A_out
- HV V_out
- Temp_max
- Charge Level
- Dampers angle
- Brake Pressure
- Acc
- Gyro
- Mag
- Yaw + Pitch
- Steering wheel
- avg temp
- 6 cell temp
- Temp after water pump
- Temp after radiator
## Technology?
- ~~QT~~
- WebApp
- ~~REST Express Api~~
- [Vue.js](https://vuejs.org/v2/guide/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- ~~MySQL~~
- [Serial Port Json Server](https://github.com/chilipeppr/serial-port-json-server)
- ~~[Iconify GMI](https://icon-sets.iconify.design/ic/)~~
- [Fontawesome](https://fontawesome.com/docs/web/use-with/vue/)
- [Vuese](https://vuese.org/)
