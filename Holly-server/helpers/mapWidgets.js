export const mapWidgets = (widget) => {
  return {
    id: widget._id,
    mainText: widget.mainText,
    subText: widget.subText,
    image: widget.image,
  };
};
