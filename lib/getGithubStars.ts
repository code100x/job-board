interface GitHubRepoResponse {
  stargazers_count?: number;
  [key: string]: unknown;
}

export const getRepoStarCount = async () => {
  const response: any = await fetch(
    "https://api.github.com/repos/code100x/job-board"
  );
  const data: GitHubRepoResponse = await response.json();
  return data.stargazers_count;
};
