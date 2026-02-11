export async function play(channel: any, sound: string): Promise<void> {
  return new Promise((resolve, reject) => {
    channel.play({ media: `sound:${sound}` }, (err: any, playback: any) => {
      if (err) return reject(err);

      playback.once("PlaybackFinished", () => {
        resolve();
      });
    });
  });
}
