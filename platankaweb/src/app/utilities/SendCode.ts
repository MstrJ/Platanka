import Post from "./Post";

const SendCode = async (setLoading: any, setError: any, email: string) => {
  setLoading(true);

  const r = await Post<undefined>({
    data: undefined,
    link: `Accounts/SendCode/${email}?title=Weryfikacja%20Adresu%20Email
      `,
    returnData: false,
  });
  if (r.error) setError(r.data);
  else setError("");
  setLoading(false);
};

export default SendCode;
