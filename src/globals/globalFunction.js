
const ToolBarConfig = 
    {
        'platform':'website',
        'device':'',
        'browser': fnBrowserDetect(),
        'timeZone': ''+new Date().getTimezoneOffset()
    };
    
var deviceDetector=function(){var b=navigator.userAgent.toLowerCase(),a=function(a){void 0!==a&&(b=a.toLowerCase());return/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(b)?"tablet":/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(b)?"phone":"desktop"};return{device:a(),detect:a,isMobile:"desktop"!=a()?!0:!1,userAgent:b}}();
function fnBrowserDetect(){
                 
    let userAgent = navigator.userAgent;
    let browserName;
    
    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
      }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
      }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
      }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
      } else if(userAgent.match(/edg/i)){
        browserName = "edge";
      }else{
        browserName="No browser detection";
      }
    return browserName;
        
}
function standartAttribute() {
    if(deviceDetector.device == 'desktop'){
        ToolBarConfig.device = 'desktop';
    } else{
        if(deviceDetector.device == 'tablet'){
            ToolBarConfig.device = 'tablet';
        
    }else{
        ToolBarConfig.device = 'phone';
    }
   
    
    }
    return ToolBarConfig;
}   
export {standartAttribute};