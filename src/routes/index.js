import { useRoutes } from "react-router-dom";

// project import
import LoginRoutes from "./LoginRoutes";
import { buildApplicationRoutes } from "../app/router";
import { useEffect, useState } from "react";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    let active = true;
    buildApplicationRoutes([LoginRoutes]).then((configuredRoutes) => {
      if (active) setRoutes(configuredRoutes);
    });
    return () => {
      active = false;
    };
  }, []);

  const renderedRoutes = useRoutes(routes || []);
  return routes ? renderedRoutes : null;
}
