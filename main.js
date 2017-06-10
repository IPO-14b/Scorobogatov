/**
*
* Параметры для игры
*
* @var bool ms_sux
* @var bool disable_ext
* @var int killed
* @var int missed
* @var int total
* @var int total_shoots
* @var int timeleft
* @var bool reloaded
* @var bool lets_start
* @var int rrr
*
*/


var ms_sux = false,
    disable_ext = false,
    killed = 0,
    missed = 0,
    total = 3,
    total_shoots = 0,
    timeleft = 120,
    reloaded = true,
    lets_start = false,
    rrr = 7;

/**
*
* функция получения версии
* @param s
*
*/
function get_version(s) {
    result = "";
    for (i = 0; i != s.length; i++) {
        if ((s.charAt(i) >= "0") && (s.charAt(i) <= "9")) {
            result+=s.charAt(i);
        } else {
            break;
        }
    }
    return result;
}


/**
*
* Функция получения даты игры
* @param n
*
*/
function rndm(n) {
    dt = new Date();
    rrr = ((Math.round(dt.getTime() / 10) + rrr) % n);
    return rrr;
}


/**
*
* Функция отрисовки ружья
* 
*/
function shotgun_array() {
    for (n = 0; n != 10; n++) {
        this[n] = new Image(200, 130);
        this[n].src = "img/shotgun0" + n + ".jpg";
    }
    return;
}

if (!disable_ext) {
    /**
    *
    * Массив выстрела
    * @var object shotgun
    *
    */
    var shotgun = new shotgun_array();
}

/**
*
* Массив картинок
* Загрузка картинок из папки
*
*/
function leo_array() {
    for (n = 0; n != 18; n++) {
        this[n] = new Image(100, 75);
        this[n].src="img/l"+n+".jpg";
    }
    return;
}

if (!disable_ext) {
    /**
    *
    * Массив Леонардо
    * @var object leo
    *
    */
    var leo = new leo_array();
}

/**
*
* Начальные значения для игры
* Появление leo по x и y
*
*/
function leos_stat() {
    this.x = rndm(5);
    this.y = rndm(3);
    this.direction = 1;
    this.pos = rndm(6);
    this.togo = rndm(20);
}

/**
*
* Расположение Леонардо
* @param n
*
*/

function leos_n(n) {
    for (m = 0; m != n; m++)
    this[m] = new leos_stat();
}

/**
*
* Кол-во одновременное появление Леонардо 
* @var int leocount
* Лицо Леонардо
* @var object leos
*
*/
var leocount = 3;
var leos = new leos_n(leocount);


/**
*
* Функция местоположения Леонардо
* @param x
* @param y
* Результат
* @param l
*
*/
function exist(x, y, l) {
    for(n=0;n!=leocount;n++) {
        if((l[n].x==x)&&(l[n].y==y))return true;
    }
    return false;
}


/**
*
* (main)
* Реализация игры "Стрелялка"
*
*/
function main_stream() {
    for (m = 0; m != leocount; m++) {
        with (leos[m]) {
            if (direction == 0) {
                pos++;
                if (pos >= 18) {
                    direction = -1;
                    pos = 1;
                 }
            } else {
                if ((pos == 0) && (direction == -1)) {
                    direction = 1;
                    xx = rndm(5);
                    yy = rndm(3);
                    while (exist(xx, yy, leos) == true) {
                        xx = rndm(5);
                        yy = rndm(3);
                    }
                    x = xx;
                    y = yy;
                    total++;
                    togo = rndm(20);
                }
                if ((pos == 8) && (direction == 1)) {
                    direction = -1;
                    togo = 5 + rndm(10);
                }
            }
            if (togo == 0) {
                pos += direction;
            } else {
                togo--;
            }
            document.images['pos' + y + x].src = leo[pos].src;
        }
    }
    setTimeout('main_stream()',50);
    return;
}

/**
*
* Анимация перезаряда
* @var nc int
*
*/
var nc = 0;

/**
*
* Функция выстрела
*
*/
function shoot_em() {
    if (nc == 10) {
        document.drobovik.src = shotgun[0].src;
        nc = 0;
        reloaded = true;
        return;
    }
    document.drobovik.src = shotgun[nc++].src;
    setTimeout("shoot_em()", 150);
    return;
}

/**
*
* Функция убийства
* @param s
*
*/
function kill_em(s) {
    if(!lets_start) {
        return;
    }
    if(!reloaded) {
        return;
    }
    shoot_em();
    reloaded = false;
    for (n = 0; n != leocount; n++) {
        if ((s == "pos" + leos[n].y + leos[n].x) && (leos[n].pos > 2)) {
            leos[n].direction = 0;
            total_shoots++;
            killed++;
            document.statistic.bodycount.value++;
            return;
        }
    }
    total_shoots++;
    missed++;
    document.statistic.misses.value++;
    return;
}

/**
*
* Функция отсчета времени
* 
*/
function set_time_left() {
    document.statistic.timeleft.value = Math.floor(timeleft / 60) + ":" + Math.floor((timeleft % 60) / 10) + timeleft % 10;
    if(--timeleft < 0) {
        document.writeln('<html><head><title>Results</title></head><body bgcolor="white" text="black"><center><h1>Game Over</h1><p>Enemies killed: <b>' + killed + '</b><br>Enemies missed: <b>' + missed + '</b><br>Accuracy: <b> ' + Math.round(100 * killed / (killed + missed + 0.01)) + '</b>%<br>Committed suicide(drowned): <b>' + (total - missed) + '</b><br></p></center>');
        document.write('</body></html>');
        document.close();
        return;
    }
    setTimeout("set_time_left()", 1000);
}

/**
*
* Функция загрузки и ожидания игры
* 
*/
function loading_sequence() {
    document.statistic.bodycount.value = "0";
    lets_start = true;
    
    /**
    *
    * Главный поток игры
    *
    */
    main_stream();
    set_time_left();
}



if (!disable_ext) {
    with (document) {
        writeln("<div align=center><a name='v6'>Стрелялка</a>");
        writeln('<table border=0 cellpadding=0 cellspacing=0>');
        for (y = 0; y != 3; y++) {
            write("<tr>");
            for (x = 0; x != 5; x++) {
                        write('<td><a href=#v666  onClick=kill_em("pos'+y+x+'")><img src="img/l0.jpg" name="pos'+y+x+'" border=0></a></td>');
            }
            write("</tr>");
        }

        writeln("</table>");
        writeln('<table border=0 cellpadding="0" cellspacing="0">');
        writeln('<tr><td width=100>&nbsp;</td>');
        writeln('<td><img src="img/shotgun00.jpg" width=200 height=130 border=0 name="drobovik"></td>');
        writeln('<td width=200 valign=top>');
        writeln('<form name="statistic">');
        writeln('<table>');
        writeln('<tr><td><b>Body Count</b></td>');
        writeln('<td><input type="text" readonly size="14" name="bodycount" value="0"></td>');
        writeln('</tr><tr><td><b>Misses</b></td>');
        writeln('<td><input type="text" readonly name="misses" size="14" value="0"></td>');
        writeln('</tr><tr><td><b>Time left</b></td>');
        writeln('<td><input type="text" readonly name="timeleft" size=7 value=""</td></tr>');
        writeln('</table></form>');
        writeln('</td></tr></table></div>');
    }
}

if (!disable_ext) {
    setTimeout("loading_sequence()",1000);
}
