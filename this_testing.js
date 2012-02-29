var foo = function(a,b) {
  console.log(this);
  console.log(a);
  console.log(b);
}

obj= {id:"hello"}
foo.call(obj, [1,2,3,4]);
foo.apply(obj, [1,2,3,4]);

var obj = { 
  id: "xyz",
  printId: function() {
    console.log(this.id + ' ' + this.toString());
  }
};

setTimeout(function() { obj.printId() }, 100);
var callback = function() { obj.printId() };
callback();

var selfObj = {
  items: ['a','b','c'],
  process: function() {
    var self = this;
    this.items.forEach(function(item) {
      self.print(item);
      console.log(this.toString());
    });
  },
  print: function(item) {
    console.log("*" + item + "*");
  }
}

selfObj.process();


var x = [1,2,3,4];
var y = x
x.push(5);
console.log(y);

var a = 1;
var b = a;
b = 2;
console.log(a);
console.log(b);
