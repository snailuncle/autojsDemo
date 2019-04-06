function OrientationListener(){
  this.__proto__ =  Object.create(events.emitter());

  this.currentOrientation = function(){
      return context.resources.configuration.orientation;
  };

  this.oldOrientation = this.currentOrientation();

  this.enable = function(){
      this.javaListener.enable();
  }

  this.disable = function(){
      this.javaListener.disable();
  }

  var that = this;
  var thread = threads.currentThread();

  this.javaListener = new JavaAdapter(android.view.OrientationListener, {
      onOrientationChanged: function() {
          thread.setImmediate(()=>{
              let orientation = that.currentOrientation();
              if(that.oldOrientation == undefined || that.oldOrientation != orientation){
                  that.oldOrientation = orientation;
                  that.emit('orientation_change', orientation);
              }
          });
      }
  }, context);

}



var orientationListener = new OrientationListener();
orientationListener.enable();
orientationListener.on("orientation_change", function(orientation){
  log(orientation);
})

setInterval(()=>{}, 1000);

events.on("eixt", function () {
  orientationListener.disable();
})
