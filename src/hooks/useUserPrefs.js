import { useState, useEffect } from "react";

// Stores the user's chosen backdrop + avatar in localStorage so it
// persists across refreshes. Swap the localStorage calls for an API
// call to your backend once you're saving this per-user in MongoDB.
const useUserPrefs = () => {
  const [backdropUrl, setBackdropUrl] = useState(
    () => localStorage.getItem("backdropUrl") || null,
  );
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("avatarUrl") || null,
  );

  useEffect(() => {
    if (backdropUrl) localStorage.setItem("backdropUrl", backdropUrl);
  }, [backdropUrl]);

  useEffect(() => {
    if (avatarUrl) localStorage.setItem("avatarUrl", avatarUrl);
  }, [avatarUrl]);

  const updateBackdrop = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBackdropUrl(url);
  };

  const updateAvatar = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  return { backdropUrl, avatarUrl, updateBackdrop, updateAvatar };
};

export default useUserPrefs;
