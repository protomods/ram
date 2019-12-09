/*!
 * jQuery CLI
 * Simulating a command line interface with jQuery
 *
 * @version : 1.0.0
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @plugin_demo : http://jimmy.surge.sh/cli
 * @license: MIT
 */

/*!* 
 * jQuery Text Typer plugin
 * https://github.com/gr8pathik/jquery-texttyper
*/
(function(e){"use strict";e.fn.textTyper=function(t){var n={typingClass:"typing",beforeAnimation:function(){},afterAnimation:function(){},speed:10,nextLineDelay:400,startsFrom:0,repeatAnimation:false,repeatDelay:4e3,repeatTimes:1,cursorHtml:'<span class="cursor">|</span>'},r=e.extend({},n,t);this.each(function(){var t=e(this),n=1,i="typingCursor";var s=t,o=s.length,u=[];while(o--){u[o]=e.trim(e(s[o]).html());e(s[o]).html("")}t.init=function(e){var n=r.beforeAnimation;if(n)n();t.animate(0)};t.animate=function(o){var a=s[o],f=r.typingClass,l=r.startsFrom;e(a).addClass(f);var c=setInterval(function(){var f=r.cursorHtml;f=e("<div>").append(e(f).addClass(i)).html();e(a).html(u[o].substr(0,l)+f);l++;if(u[o].length<l){clearInterval(c);o++;if(s[o]){setTimeout(function(){e(a).html(u[o-1]);t.animate(o)},r.nextLineDelay)}else{e(a).find("."+i).remove();if(r.repeatAnimation&&(r.repeatTimes==0||n<r.repeatTimes)){setTimeout(function(){t.animate(0);n++},r.repeatDelay)}else{var h=r.afterAnimation;if(h)h()}}}},r.speed)};t.init()});return this}})(jQuery)


// Let's do it!!
$(document).ready(function() {
var perCentaged=0;
var preLoaded=0
var cycleDot=0;
var cycleFlag=true;
var randomEntropy=1;


function preLoadingMessages(){


//document.getElementById("consoled").innerHTML+="\nNow downloading: <span id='progress'>0</span>%";
document.getElementById("innerloadingBar").style.display="block";
document.getElementById("innerInnerLoadingBar").setAttribute("class","animating");
document.getElementById("innerloadingBar").style.opacity=1;
// subject.scrollTop = document.getElementById("globalgladwrap").scrollHeight;
//setTimeout(function(){preLoadingMessages();},Math.random()*3000*randomEntropy);
return tickedLoad();
}




function tickedLoad(){
	if (perCentaged>=100){
		perCentaged=100;
		document.getElementById("innerInnerLoadingBar").style.width=perCentaged+"%";
		cycleFlag=true;
		$('#home').append("<p>RAM download complete!</p>");
		setTimeout(function(){
			//var desc=$('#desc').html();
			$('.downloadpage').hide();
			$('#desc').fadeIn(3000);
		},1000);		
		
		return false;
	}
	/* Warming up.. */
	if (perCentaged<6){
		perCentaged+=Math.random()*1;
	}

	/* Unstable exploit testing.. */
	else if (perCentaged>5 && perCentaged<18){
		perCentaged+=Math.random()*2+0.5;
	}


	/* Slow down1 You're abusing our resources!.. */
	else if (perCentaged>17 && perCentaged<25){
		perCentaged+=Math.random()*1+0.1;
	}

	/* Little less random.. */
	else if (perCentaged>24 && perCentaged<35){
		perCentaged+=Math.random()*2+1;
	}

	/* Smoother download.. */
	else if (perCentaged>34 && perCentaged<40){
		perCentaged+=2;
	}

	/* No lag at download.. */
	else if (perCentaged>39 && perCentaged<60){
		perCentaged+=1;
	}

	/* Download boost.. */
	else if (perCentaged>59 && perCentaged<90){
		perCentaged+=Math.random()*3+3;
	}

	/* Download slow down.. */
	else if (perCentaged>89 && perCentaged<95){
		perCentaged+=Math.random()*3+1;
	}

	/* Download almost stalled.. */
	else if (perCentaged>94 && perCentaged<99){
		perCentaged+=Math.random();
	}

	/* Completed.. */
	else if (perCentaged>98 && perCentaged<101){
		perCentaged=100;
	}
	document.getElementById("innerInnerLoadingBar").style.width=perCentaged+"%";
	document.getElementById("progress").innerHTML=Math.floor(perCentaged);
	setTimeout(function(){tickedLoad();},400);
}
$('.command').hide();
$('.downloadpage').show();
$('#home').addClass('open');
$('#home').textTyper({
	speed:20,
	afterAnimation:function(){
	  $('.command').fadeIn();
	  setTimeout(function(){preLoadingMessages();},1000);
 
	}
});

/*document.getElementById("downloadButton").onclick=function(){
	var that=this;
  $('.command').hide();
  $('.downloadpage').show();
  //$('input[type="text"]').focus();
  $('#home').addClass('open');
  $('#home').textTyper({
        speed:20,
        afterAnimation:function(){
          $('.command').fadeIn();
         // $('input[type="text"]').focus();
         // $('input[type="text"]').val('');
			
			setTimeout(function(){
			that.style.opacity=0;

			setTimeout(function(){
			that.style.display="none";

			setTimeout(function(){preLoadingMessages();},1000);
			},500);

			},200);		 
        }
      });	
}*/


// get array of section ids, that exist in DOM
var sectionArray = [];
// We are using <section> here, you can use <div> or <article> if you want
$('section').each( function(i,e) {
    //you can use e.id instead of $(e).attr('id')
    sectionArray.push($(e).attr('id'));
});

// Debug
//console.log(sectionArray);



// Command Input------------------------------

  $('input[type="text"]').keyup(function(e){

    if(e.which == 13){// ENTER key pressed

      $('.command').hide();
      var destination = $('input[type="text"]').val();

      // Display section with id == destination and hide all others
      $('section[id="' + destination + '"]').addClass('open').siblings().removeClass('open');

      // If destination does not match our array of section ids, display error section
      if($.inArray(destination, sectionArray) == -1){
        $('#error').addClass('open');
        $('#error').siblings().removeClass('open');
      }

      // All sections with class .open init textTyper
      $('.open').textTyper({
        speed:20,
        afterAnimation:function(){
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

    }// end if ENTER key pressed

  });// end keyup function

// End Command Input-----------------------------

});