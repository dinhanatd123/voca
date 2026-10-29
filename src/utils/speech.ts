export function speakEnglishText(
  text: string,
  lang: 'en-US' | 'en-GB' = 'en-US',
  rate = 1.0
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  try {
    window.speechSynthesis.cancel();
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
