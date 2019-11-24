import React, { useEffect } from "react";
import { useToggle } from "../hooks/toggle.hook";

export function Toggle(props) {
  const [state, toggle] = useToggle(true);

  useEffect(toggle, []);

  return <input type="checkbox" onChange={toggle} checked={state} />;
}
