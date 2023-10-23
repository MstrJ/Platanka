const Get = async <T>(props: { urlEnd: string }) => {
  try {
    const link = `${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/${props.urlEnd}`;
    const res = await fetch(link, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    return (await res.json()) as T;
  } catch {
    return null;
  }
};

export default Get;
