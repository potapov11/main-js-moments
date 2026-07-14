import { useState, useEffect } from "react";

function Search() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);

  //использовать debaunce
  useEffect(() => {
    fetch(`/api/search?q=${q}`)
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, [q]);

  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}
