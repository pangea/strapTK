function Raw(body) {
  this.text = body;
  this.klass = "Raw"
}

Raw.prototype.render = function() {
  return this.text;
}