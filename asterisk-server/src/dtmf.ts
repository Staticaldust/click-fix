export function waitDigit(channel: any, timeout = 8000): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      channel.removeListener("ChannelDtmfReceived", handler);
      reject("timeout");
    }, timeout);

    const handler = (event: any) => {
      clearTimeout(timer);
      channel.removeListener("ChannelDtmfReceived", handler);
      resolve(event.digit);
    };

    channel.on("ChannelDtmfReceived", handler);
  });
}
