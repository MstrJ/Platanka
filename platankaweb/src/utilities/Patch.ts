const Patch = async <T>(link: string, body?: T): Promise<boolean> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/${link}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );
    if (!res.ok) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export default Patch;
