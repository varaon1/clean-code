const filterFn = (item, value) => {
  let fragments = value.split(/[\s,.-;:_]/);
  return fragments.some(
    (frag) =>
      item.data.message.id.toLowerCase().indexOf(frag.toLowerCase()) !== -1
  );
};

filterFn: (item, value) => {
  //FIXME: DRY!
  let fragments = value.split(/[\s,.-;:_]/);
  return fragments.some(
    (frag) =>
      //FIXME: pouzit optional chaining pro zprehledneni (viz vyse)
      item.data.message &&
      item.data.message.metadata &&
      item.data.message.metadata.receiver &&
      item.data.message.metadata.receiver
        .toLowerCase()
        .indexOf(frag.toLowerCase()) !== -1
  );
};
