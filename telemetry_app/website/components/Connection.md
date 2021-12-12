# Connection

## Events

<!-- @vuese:Connection:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|serialOutput|Send new data do main Array|The argument is an Array with new data|
|clearInputs|Send message to clear all serial data|-|

<!-- @vuese:Connection:events:end -->


## Methods

<!-- @vuese:Connection:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|sendMessage|Sends given message to the echo websocket server|The message to send|
|handleSerialList|Method for handling incoming message with list of available ports|-|
|handleJSON|handling of JSON message with data|-|

<!-- @vuese:Connection:methods:end -->


