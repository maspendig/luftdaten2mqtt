# luftdaten2mqtt
A simple nodejs based service to consume api calls from local [luftdaten](https://luftdaten.info/) sensors and publish them as mqtt data, so one can use them for own purposes like visualize data in a home automation instance.

| Env Var | Description |
| ------------- | ------------- |
| PORT| (optional; default 3000) the port the server is listening on  |
| MQTT_HOST  | The mqtt broker to publish (eg. mqtt://mosquitto.local)  |
| MQTT_USERNAME  | (optional) The mqtt user |
| MQTT_PASSWORD  | (optional) The mqtt user password |
