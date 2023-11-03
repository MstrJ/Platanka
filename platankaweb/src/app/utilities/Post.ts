const Post = async <T>(props: {
  link: string;
  data: T;
  returnData?: boolean;
}) => {
  try {
    if (props.returnData === undefined) {
      props.returnData = true;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULTAPI_URL}/api/${props.link}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: props.data !== undefined ? JSON.stringify(props.data) : undefined,
      }
    );

    if (res.status == 405) return { error: true, data: "Niedozwolona metoda" };
    if (!res.ok) {
      return { error: true, data: await res.text() };
    }

    return {
      error: false,
      data: props.returnData ? await res.json() : true,
    };
  } catch {
    return { error: true, data: "Błąd podczas łączenia się z bazą danych" };
  }
};

export default Post;
