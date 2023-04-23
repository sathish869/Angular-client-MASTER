export interface UserNode {
  name?: string;
  level: number;
  logo?: string;
  children?: UserNode[];
  expanded?: boolean;
  isLoading?: boolean;
  stargazers_count?: number;
}
