const daysAgo = (jobDate:Date)=>{
    const postDate = new Date(jobDate);
    const now = new Date();
    const differenceInMilles = now.getTime() - postDate.getTime();
    const differenceInDays = Math.floor(differenceInMilles / (1000 * 60 * 60 * 24))
    return differenceInDays === 0 ? 'Today': `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
}
export default daysAgo;