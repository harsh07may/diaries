export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  image: string;
  excerpt: string;
  author: string;
  content: string;
  color: 'yellow' | 'red' | 'blue';
}

export interface FrontMatter {
  title: string;
  date: string;
  tags: string[];
  image: string;
  excerpt: string;
  author: string;
}
