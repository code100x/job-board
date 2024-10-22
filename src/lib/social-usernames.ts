const username = (link: string) => {
  return link.split('/')[link.split('/').length - 1];
};
const SocialUsername = (platform: string, link: string) => {
  if (platform === 'twitter') return '@' + username(link);
  if (platform === 'youtube') return username(link);
  if (platform === 'linkedin') return 'in/' + username(link);
  if (platform === 'github') return '@' + username(link);
  if (platform === 'instagram') return '@' + username(link);
  if (platform === 'telegram') return '@' + username(link);
  return null;
};
export default SocialUsername;
