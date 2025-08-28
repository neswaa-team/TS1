import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { DEFAULT_PAGE_TITLE } from "@/context/constants";
import { NotificationProvider } from "@/context/useNotificationContext";
import type { ChildrenType } from "@/types/component";
import { ChatProvider } from "@/context/useChatContext";
import { LayoutProvider } from "@/context/useLayoutContext";
import { AuthProvider } from "@/context/useAuthContext";
import { CookiesProvider } from "react-cookie";

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  const handleChangeTitle = () => {
    if (document.visibilityState === "hidden")
      document.title = "Please come back 🥺";
    else document.title = DEFAULT_PAGE_TITLE;
  };

  useEffect(() => {
    if (document) {
      const e = document.querySelector<HTMLDivElement>("#__next_splash");
      if (e?.hasChildNodes()) {
        document.querySelector("#splash-screen")?.classList.add("remove");
      }
      e?.addEventListener("DOMNodeInserted", () => {
        document.querySelector("#splash-screen")?.classList.add("remove");
      });
    }

    document.addEventListener("visibilitychange", handleChangeTitle);
    return () => {
      document.removeEventListener("visibilitychange", handleChangeTitle);
    };
  }, []);

  return (
    <CookiesProvider>
      <LayoutProvider>
        <AuthProvider>
          <ChatProvider>
            <NotificationProvider>
              {children}
              <ToastContainer theme="colored" />
            </NotificationProvider>
          </ChatProvider>
        </AuthProvider>
      </LayoutProvider>
    </CookiesProvider>
  );
};
export default AppProvidersWrapper;
