import express from "express";
import cors from "cors";
import "dotenv/config";
import * as mqtt from "mqtt"; // import everything inside the mqtt module and give it the namespace "mqtt"

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

const client: mqtt.MqttClient = mqtt.connect(process.env.MQTT_HOST!, {
  password: process.env.MQTT_PASSWORD,
  username: process.env.MQTT_USERNAME,
  port: 1883,
});

type LuftdatenRequest = {
  esp8266id: string;
  software_version: string;
  sensordatavalues: { value_type: string; value: string }[];
};

app.post("/", (req, res) => {
  console.log("Request Received");
  const luftdatenRequest = req.body as LuftdatenRequest;

  for (const sensorData of luftdatenRequest.sensordatavalues) {
    client.publish(
      `luftdaten/${
        luftdatenRequest.esp8266id
      }/${sensorData.value_type.toLowerCase()}`,
      sensorData.value
    );
  }
  res.sendStatus(200);
});

if (!process.env.MQTT_HOST) {
  console.error("No >MQTT_HOST< env var set!");
  process.exit(1);
}

app.listen(port, () => {
  console.log("luftdaten2mqtt listening on port 3000");
});
