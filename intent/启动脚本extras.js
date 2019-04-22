app.startActivity({
  packageName : "org.autojs.autojs",
  className : "org.autojs.autojs.external.open.RunIntentActivity",
  extras : {
      script: "engines.stopAllAndToast();",
  },
  type : "application/x-javascript"
});
