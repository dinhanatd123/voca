let activeAudio: HTMLAudioElement | null = null;

export function speakEnglishText(
  text: string,
  lang: 'en-US' | 'en-GB' = 'en-US',
  rate = 1.0,
  oxfordMp3Url?: string
): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Stop any ongoing audio or speech synthesis
  try {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // ignore
  }

  // If an official Oxford Learner's Dictionaries MP3 URL is provided, play it first
  if (oxfordMp3Url) {
    try {
      const audio = new Audio(oxfordMp3Url);
      audio.playbackRate = rate;
      activeAudio = audio;
      audio.play().catch(() => {
        fallbackWebSpeech(text, lang, rate);
      });
      return;
    } catch {
      // Fallback to Web Speech API
    }
  }

  fallbackWebSpeech(text, lang, rate);
}

function fallbackWebSpeech(
  text: string,
  lang: 'en-US' | 'en-GB',
  rate: number
): void {
  if (!('speechSynthesis' in window)) return;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const matched = voices.find((v) => v.lang.includes(lang));
    if (matched) {
      utterance.voice = matched;
    }
    window.speechSynthesis.speak(utterance);
  } catch {
    // ignore speech synthesis errors in headless environments
  }
}
