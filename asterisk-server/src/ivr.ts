import { play } from "./audio";
import { waitDigit } from "./dtmf";
import { findWorkers } from "./workers";

type Lang = "he" | "en";

export async function runIVR(channel: any) {
  await channel.answer();

  // 1 — language
  await play(channel, "custom/lang");
  let digit = await waitDigit(channel);
  const lang: Lang = digit === "2" ? "en" : "he";

  // 2 — district
  await play(channel, `custom/${lang}/district`);
  const district = await waitDigit(channel);

  // 4 — category
  await play(channel, `custom/${lang}/category`);
  const category = await waitDigit(channel);

  // 5 — gender
  await play(channel, `custom/${lang}/gender`);
  const gender = await waitDigit(channel);

  // 6 — ordering
  await play(channel, `custom/${lang}/ordering`);
  const ordering = await waitDigit(channel);

  console.log({ lang, district, category, gender, ordering });

  // 7 — results
  const workers = await findWorkers({ district, category, gender, ordering, lang });

  await play(channel, `custom/${lang}/result`);

  // Announce up to two workers dynamically
  if (workers.length >= 1) {
    // Ideally you'd synthesize or play name + phone audio; for now play static prompts
    await play(channel, `custom/${lang}/worker1`);
  }
  if (workers.length >= 2) {
    await play(channel, `custom/${lang}/worker2`);
  }

  channel.hangup();
}
