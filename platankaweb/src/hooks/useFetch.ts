"use client";
import React, { useState, useEffect, useCallback } from "react";
const useFetch = <T>(props: { urlEnd: string }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const timeout = setTimeout(() => {
    setStatus("delayed");
  }, 2000);

  const getData = useCallback(async () => {
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/${props.urlEnd}`,
        {
          cache: "no-store",
          next: {
            revalidate: 3600,
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const json = await res.json();
      setData(json);
      setError("");
      setStatus("ok");
    } catch (error) {
      setError("Nie udało się pobrać danych");
      setStatus("error");
      setData(null);
    } finally {
      setLoading(false);
      clearTimeout(timeout);
    }
  }, [props.urlEnd]);
  useEffect(() => {
    getData();
  }, [getData]);
  return { loading, data, getData, error, status };
};

export default useFetch;
