export const getPaginationInfo = async (...info: Array<string | undefined>) => {
  const [page, limit, sortBy, sortOrder] = info;

  const pages = Number(page) || 1;

  // how many data to take
  const limits = Number(limit) || 10;

  // how many page to skip
  const skip = (pages - 1) * limits;

  // how to show the data(by default sortby=budget and sortorder=desc )
  const orderBy = {
    [sortBy ? sortBy : "budget"]: sortOrder ? sortOrder : "desc",
  };

  return { pages, limits, skip, orderBy };
};
