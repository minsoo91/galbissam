function readFile() {
    var f = document.getElementById("yourfileinput").files[0]; 
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
        console.log(r.result);
      }
      r.readAsText(f);
    } else { 
      console.log("file could not be found")
    }
}