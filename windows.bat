start /d "%1" /min serial-port-json-server.exe
cd "./telemetry_app/"
npm install && npm run serve