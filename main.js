var ms_sux=false;
var disable_ext=false;
var killed=0;
var missed=0;
var total=3;
var total_shoots=0;
var timeleft=120;
var reloaded=true;
var lets_start=false;
var rrr=7;
function get_version(s){
        result="";
        for(i=0;i!=s.length;i++)
                if((s.charAt(i)>="0")&&(s.charAt(i)<="9"))result+=s.charAt(i);
                else break;
        return result;
}
if((navigator.appName=="Microsoft Internet Explorer")&&(get_version(navigator.appVersion)<4)){
        disable_ext=true;
        ms_sux=true;
}

if((navigator.appName=="Netscape")&&(get_version(navigator.appVersion)<3)){
        disable_ext=true;
}