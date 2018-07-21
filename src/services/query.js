const Query = {
  getParamValueByName(name, query) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
    const results = regex.exec(query);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },
  category(query, value) {
    const currentValues = this.getParamValueByName('category', query);
    if (currentValues) {
      return currentValues.split(',').indexOf(value) === -1
        ? `category=${currentValues},${value}`
        : `category=${currentValues
            .split(',')
            .filter(i => i !== value)
            .toString()}`;
    }
    return query ? `${query}&category=${value}` : `?category=${value}`;
  },
};

export default Query;
