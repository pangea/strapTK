function Raw(attrs) {
  // the idea here is you can send in an object with the field body or just a string for the body
  this.body = attrs.body || attrs;
  this.klass = "Raw"
}

Raw.prototype.render = function() {
  return this.body;
}