import { useRoutes } from "react-router-dom";

// project import
import LoginRoutes from "./LoginRoutes";
import { buildApplicationRoutes } from "../app/router";
import { useEffect, useState } from "react";

// ==============================|| ROUTING RENDER ||============================== //

let applicationRoutesPromise;

const getApplicationRoutes = () => {
  if (!applicationRoutesPromise) {
    applicationRoutesPromise = buildApplicationRoutes([LoginRoutes]).catch(
      (error) => {
        applicationRoutesPromise = null;
        throw error;
      }
    );
  }

  return applicationRoutesPromise;
};

export default function ThemeRoutes() {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    let active = true;
    getApplicationRoutes().then((configuredRoutes) => {
      if (active) setRoutes(configuredRoutes);
    });
    return () => {
      active = false;
    };
  }, []);

  const renderedRoutes = useRoutes(routes || []);
  return routes ? renderedRoutes : null;
}
