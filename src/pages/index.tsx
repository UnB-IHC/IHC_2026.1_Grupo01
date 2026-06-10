import React, { useEffect } from "react";
import { useHistory } from "@docusaurus/router"; // Importe o roteador do docusaurus

export default function Home() {
  const history = useHistory();

  useEffect(() => {
    history.push("/docs/inicio");
  }, [history]);

  return <div>Redirecionando...</div>;
}
