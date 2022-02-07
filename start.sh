#!/bin/bash


# create paths vars

LINUX_PATH_arm="./serialWebsocket/serial-port-json-server-1.96_linux_arm/"
LINUX_PATH_amd64="./serialWebsocket/serial-port-json-server-1.96_linux_amd64/"
WINDOWS_BATCH="windows.bat"
WINDOWS_PATH_amd64="./serialWebsocket/serial-port-json-server-1.96_windows_amd64/"
WINDOWS_PATH_386="./serialWebsocket/serial-port-json-server-1.96_windows_386/"


if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # ...
        echo "Using Linux"
        (trap 'kill 0' SIGINT; /bin/bash $LINUX_PATH_amd64/serial-port-json-server ; cd telemetry_app ; npm run serve)
elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac OSX
        echo "Using Mac OS X"
        /bin/bash $LINUX_PATH_amd64
        (trap 'kill 0' SIGINT; /bin/bash $LINUX_PATH_amd64/serial-port-json-server ; cd telemetry_app ; npm run serve)
elif [[ "$OSTYPE" == "cygwin" ]]; then
        # POSIX compatibility layer and Linux environment emulation for Windows
        echo "Using POSIX"
        echo "OS not supported"
elif [[ "$OSTYPE" == "msys" ]]; then
        # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
        echo "Using Lightweight shell and GNU utilities compiled for Windows"
        ./$WINDOWS_BATCH $WINDOWS_PATH_amd64
elif [[ "$OSTYPE" == "win32" ]]; then
        # I'm not sure this can happen.
        echo "Using Windows"
        ./$WINDOWS_BATCH $WINDOWS_PATH_amd64
elif [[ "$OSTYPE" == "freebsd"* ]]; then
        # ...
        echo "Using freebsd"
        echo "OS not supported"
        read -p "Press any key to resume ..."

else
        # Unknown.
        echo "Error"
        echo "OS not supported"
        read -p "Press any key to resume ..."
fi
