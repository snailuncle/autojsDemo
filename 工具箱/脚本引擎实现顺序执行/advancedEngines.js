//用于auto.js pro
module.exports=(()=>{
    var advancedEngines = {}
    
    advancedEngines.execScriptFile=function(path,args,config){
        let ss=com.stardust.autojs.script.JavaScriptFileSource(java.io.File(files.path(path)))
        return execute(ss,args,config);
    } 
    
    advancedEngines.execScript=function(name,script,args,config){
        let ss=com.stardust.autojs.script.StringScriptSource(name,script)
        return execute(ss,args,config);
    }
    
    advancedEngines.execAutoScript=function(){
        let ss=com.stardust.autojs.script.AutoFileSource(java.io.File(files.path(path)))
        return execute(ss,args,config);
    }
    
    var execute = function(scriptSource,args,config) {
        args=args||{}
        config=config||{}
        
        importPackage(com.stardust.autojs.execution)
        let listener=
        ScriptExecutionListener({
           onStart: 
             function(execution) {
                let topScope = execution.getEngine().getRuntime().getTopLevelScope()
                let ScriptableObject = org.mozilla.javascript.ScriptableObject
                for (let key in args) {
                     ScriptableObject.putProperty(topScope, key, args[key])
                }
             }
        })
        return runtime.engines.execute(null,ScriptExecutionTask(scriptSource,listener,fillConfig(config)));  
    }
    var fillConfig = function(c) {
        var config = new com.stardust.autojs.execution.ExecutionConfig();
        c = c || {};
        c.path = c.path || files.cwd();
        if (c.path) {
            config.workingDirectory = c.path;
        }
        config.delay = c.delay || 0;
        config.interval = c.interval || 0;
        config.loopTimes = (c.loopTimes === undefined) ? 1 : c.loopTimes;
        if (c.arguments) {
            var arguments = c.arguments;
            for (var key in arguments) {
                if (arguments.hasOwnProperty(key)) {
                    config.setArgument(key, arguments[key]);
                }
            }
        }
        config.projectConfig = engines.myEngine().getTag("execution.config").projectConfig;
        return config;
    }
    return advancedEngines
})()