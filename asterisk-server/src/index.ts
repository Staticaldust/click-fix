import AriClient from "ari-client";
import { runIVR } from "./ivr";

const ARI_URL = "http://asterisk:8088";
const USER = "ivruser";
const PASS = "1234";
const APP = "worker-ivr";

AriClient.connect(ARI_URL, USER, PASS)
  .then((client) => {
    console.log("Connected to Asterisk ARI");

    client.on("StasisStart", async (event, channel) => {
      console.log("Incoming call:", channel.id);

      try {
        await runIVR(channel);
      } catch (err) {
        console.error("IVR error:", err);
        try { channel.hangup(); } catch {}
      }
    });

    client.start(APP);
  })
  .catch((err) => {
    console.error("Failed to connect ARI", err);
  });
