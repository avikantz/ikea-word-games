import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const MUTE_KEY = "mute";

type AudioStyle = 1 | 2;

type AudioType = {
  isMuted: boolean;
  // Change style
  style?: AudioStyle;
  setStyle?: Dispatch<SetStateAction<AudioStyle>>;
  // Mute and unmute
  muteAudio?: () => void;
  unmuteAudio?: () => void;
  // Play audio
  playFailureAudio?: () => void;
  playSuccessAudio?: () => void;
};

export const AudioContext = createContext<AudioType>({ isMuted: false });

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [style, setStyle] = useState<AudioStyle>(1);
  const [isMuted, setMuted] = useState(false);

  const [successAudio, setSuccessAudio] = useState<HTMLAudioElement>();
  const [failureAudio, setFailureAudio] = useState<HTMLAudioElement>();

  // Populate audio elements
  useEffect(() => {
    setSuccessAudio(new Audio(`/assets/audio/correct-${style}.mp3`));
    setFailureAudio(new Audio(`/assets/audio/wrong-${style}.mp3`));
  }, [style]);

  // Get muted state from localStorage
  useEffect(() => {
    const muted = localStorage.getItem(MUTE_KEY);
    setMuted(!!muted);
  }, []);

  // Mute and unmute
  const muteAudio = useCallback(() => {
    setMuted(true);
    localStorage.setItem(MUTE_KEY, "1");
  }, []);

  const unmuteAudio = useCallback(() => {
    setMuted(false);
    localStorage.removeItem(MUTE_KEY);
  }, []);

  // Audios
  const playFailureAudio = useCallback(() => {
    if (isMuted) return;
    failureAudio?.play();
  }, [failureAudio, isMuted]);

  const playSuccessAudio = useCallback(() => {
    if (isMuted) return;
    successAudio?.play();
  }, [isMuted, successAudio]);

  return (
    <AudioContext.Provider
      value={{ isMuted, style, setStyle, muteAudio, unmuteAudio, playFailureAudio, playSuccessAudio }}
    >
      {children}
    </AudioContext.Provider>
  );
};
