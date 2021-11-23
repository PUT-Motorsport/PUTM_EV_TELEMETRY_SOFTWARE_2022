# PUTM_EV_TELEMETRY_SOFTWARE_2022

Web Application that allows read data from CAN easily

To compile use: `npm install ` with Node.js installed
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
- Export to CSV
- Fast serial data processing
- slower gui refreshrate


## Parameters GUI Widgets

- [x] RPM
- [ ] RMS+-
- [x] Temperatures
- [x] Battery
- [ ] Cells
- [ ] RTD
- [x] Brakes
- [x] Tires
- [ ] HV
- [x] Dampers
- [x] Acceleration
- [ ] Gyro
- [ ] Mag
- [ ] Yaw + Pitch
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
- Vue.js
- Serial API / nodeserial
- ~~MySQL~~
- socket.io / websocket
