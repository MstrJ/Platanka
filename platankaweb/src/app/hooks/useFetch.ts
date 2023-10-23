"use client";
import React, { useState, useEffect, useCallback } from "react";
const useFetch = <T>(props: { urlEnd: string }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  console.log(process.env.NEXT_PUBLIC_DEFAULTAPI_URL);
  const getData = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/${props.urlEnd}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [props.urlEnd]);
  useEffect(() => {
    getData();
  }, [getData]);
  return { loading, data };
};

export default useFetch;
