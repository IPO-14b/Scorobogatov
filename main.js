var ms_sux = false;
var disable_ext = false;
var killed = 0;
var missed = 0;
var total = 3;
var total_shoots = 0;
var timeleft = 120;
var reloaded = true;
var lets_start = false;
var rrr = 7;
function get_version(s) {
    result="";
    for(i=0;i!=s.length;i++)
        if((s.charAt(i)>="0")&&(s.charAt(i)<="9"))result+=s.charAt(i);
                else break;
        return result;
}
if((navigator.appName = ="Microsoft Internet Explorer")&&(get_version(navigator.appVersion)<4)){
        disable_ext=true;
        ms_sux=true;
}

if((navigator.appName= ="Netscape")&&(get_version(navigator.appVersion)<3)){
        disable_ext=true;
}
function rndm(n) {
        dt=new Date();
        rrr=((Math.round(dt.getTime()/10)+rrr)%n);
        return rrr;
}
function shotgun_array(){
        for(n=0;n!=10;n++){
                this[n]=new Image(200,130);
                this[n].src="shotgun0"+n+".jpg";
        }
        return;
}
if(!disable_ext)
var shotgun=new shotgun_array();

function leo_array(){
        for(n=0;n!=18;n++){
                this[n]=new Image(100,75);
                this[n].src="l"+n+".jpg";
        }
        return;
}
if(!disable_ext)
var leo=new leo_array();

function leos_stat(){
        this.x=rndm(5);
        this.y=rndm(3);
        this.direction=1;
        this.pos=rndm(6);
        this.togo=rndm(20);
}
function leos_n(n){
        for(m=0;m!=n;m++)
                this[m]=new leos_stat();
}
var leocount=3;
var leos=new leos_n(leocount);

function exist(x,y,l){
        for(n=0;n!=leocount;n++)
                if((l[n].x==x)&&(l[n].y==y))return true;
        return false;
}
function main_stream(){
        for(m=0;m!=leocount;m++){
                with (leos[m]){
                        if(direction==0){
                                pos++;
                                if(pos>=18){
                                        direction=-1;
                                        pos=1;
                                }
                        }
                        else{
                                if((pos==0)&&(direction==-1)){
                                        direction=1;
                                        xx=rndm(5);
                                        yy=rndm(3);
                                        while(exist(xx,yy,leos)==true){
                                                xx=rndm(5);
                                                yy=rndm(3);
                                        }
                                        x=xx;
                                        y=yy;
                                        total++;
                                        togo=rndm(20);
                                }
                                if((pos==8)&&(direction==1)){
                                        direction=-1;
                                        togo=5+rndm(10);
                                }
                                if(togo==0)pos+=direction;else togo--;
                        }
                document.images['pos'+y+x].src=leo[pos].src;
                }
        }
        setTimeout('main_stream()',50);
        return;
}
