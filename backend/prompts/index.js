import anshumanPrompt from './anshuman.js';
import abhimanyuPrompt from './abhimanyu.js';
import kshitijPrompt from './kshitij.js';

const prompts = {
  anshuman: anshumanPrompt,
  abhimanyu: abhimanyuPrompt,
  kshitij: kshitijPrompt,
};

export const getSystemPrompt = (persona) => prompts[persona] ?? null;
