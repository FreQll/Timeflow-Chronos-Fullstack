import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Panel from "../components/panel/Panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { getSavedState } from "../redux/store";

const Layout = ({
  calendars,
  changeActiveEventTypes,
  activeCalendar,
  changeActiveCalendar,
}) => {
  const isAuth = getSavedState()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/authentication");
  }, []);

  return (
    <div className="w-[100vw] h-[100vh]">
      {isAuth && (
        <ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <Panel
              calendars={calendars}
              changeActiveEventTypes={changeActiveEventTypes}
              activeCalendar={activeCalendar}
              changeActiveCalendar={changeActiveCalendar}
            />
          </ResizablePanel>
          <ResizableHandle withHandle className={"bg-white"} />
          <ResizablePanel defaultSize={80}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

export default Layout;
