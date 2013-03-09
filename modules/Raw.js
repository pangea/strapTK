function Raw(body) {
  this.text = (body || "");
}

Raw.prototype.render = function() {
  return this.text;
}