type Card = {
  _id: {
    $oid: string; // MongoDB ObjectId as a string
  };
  category: any;
  address: string; // Ethereum address
  categoryId: string; // Category ID
  name: string; // Name of the entity
  x: string; // X's URL
  image: string; // URL to an image
  isWrapper: boolean; // Boolean indicating if it's a wrapper
};

type CollectionItem = {
  _id: string; // Unique identifier for the item
  image: string; // URL of the image
  description: string; // Description of the item
  numberOfowner: number; // Number of owners
  title: string; // Title of the item
};
