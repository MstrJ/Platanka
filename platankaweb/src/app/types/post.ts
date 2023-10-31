type PostType = {
  _Id: string;
  title: string;
  category: string;
  active: boolean;
  description: string;
  price: number;
  imagesIds: string[];
  uploadDate: string;
};

export type Category = {
  _Id: string;
  name: string;
};
export default PostType;
