type Card = {
  _id:
    | {
        $oid: string; // MongoDB ObjectId as a string
      }
    | string;
  category: Category;
  emblems: Emblem[];
  address: string; // Ethereum address
  categoryId: string; // Category ID
  name: string; // Name of the entity
  x: string; // X's URL
  image: string; // URL to an image
  isWrapper: boolean; // Boolean indicating if it's a wrapper
  mainColor: string;
};

type Emblem = {
  _id: {
    $oid: string;
  };
  name: string;
  rank: number;
  image: string;
  isMutil: Boolean;
  isNew: Boolean;
};
type Post = {
  _id: string;
  name: string;
  content: string;
  mediaLink: string;
  shortDescription: string;
  topicId: string;
  releaseDate: string;
  col: number;
  mediaType: string;
};
type World = {
  _id: string;
  name: string;

  image: string;

  isNew: Boolean;
};
type Category = {
  _id: string;

  name: string;
};
type Topic = {
  _id: string;
  totalPost: number;
  name: string;
};

type CollectionItem = {
  _id: string; // Unique identifier for the item
  image: string; // URL of the image
  description: string; // Description of the item
  numberOfowner: number; // Number of owners
  title: string; // Title of the item
};

type Beanz = {
  _id: string;
  name: string;
  description: string;
  traits: string;
  color: string;
  icon: string;
  avatar: string;
  position: string;
};
