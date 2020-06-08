import React, { useCallback } from "react";
import ProfileContext from "../contexts/ProfileContext";
import useAuthDataApi from "../hooks/useAuthDataApi";
import useAuth from "../hooks/useAuth";
import useInterval from "../hooks/useInterval";
import { format } from "date-fns";
import { Profile } from "elixir-backend";

interface Props {
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<Props> = ({ children }) => {
  const { setAuthAndRenewToken } = useAuth();
  const onError = useCallback(() => {
    // If we can't load the profile data, we have stale tokens
    // (remember the useAuthDataApi tries to renew automatically)
    // Forget them and log the user out
    setAuthAndRenewToken(null, null);
  }, [setAuthAndRenewToken]);
  const { data, doFetchHash } = useAuthDataApi(
    "/be/api/v1/profile",
    null,
    onError
  );

  // Every 10 minutes, re-check our profile.
  // This will cause our auth tokens to be refreshed, automatically
  // if they have expired.
  // Also, if we're logged out or the backend goes down, the frontend
  // will know.
  const fetchProfileEvery10Mins = useCallback(() => {
    // Make a Timestamp that changes every 10 minutes
    let ts = format(new Date(), "h:mm");
    ts = ts.slice(0, -1);
    doFetchHash(ts);
  }, [doFetchHash]);
  useInterval(fetchProfileEvery10Mins, 60 * 1000);

  const user: null | Profile =
    data != null && data.user_profile != null ? data.user_profile : null;
  return (
    <ProfileContext.Provider value={user}>{children}</ProfileContext.Provider>
  );
};
export default ProfileProvider;
