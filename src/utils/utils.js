const extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    // console.log(item.url.match(idRegExp));
    return item.url.match(idRegExp)[1];
};

export { extractId };
