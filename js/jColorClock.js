$(document).ready(function(){

    // Instantiate the date object
    date = new Date();

    // Set some variables
    var twelveHour = false;
    var clockMode  = 'time';
    console.log(getHex(date));
    var time       = getTime(date, twelveHour);

    // Set the background color
    setBackgroundColor(getHex(date), false);

    // Update the time and scale the clock
    render(time);
    clockScale();

    // Set interval for every 1 second
    setInterval(function() {

        // Instantiate the date object
        date = new Date();

        // Set the time variable
        if (clockMode == 'time') {
            var time = getTime(date, twelveHour);
        } else if (clockMode == 'hex') {
          var time = hexToTime(getHex(date));
        }

        // Update the time
        render(time);
        // Fade the background color
        setBackgroundColor(getHex(date), true);

        // Destroy the date object to conserve memory
        delete date;

    }, 1000);

    // Set the copyright date
    var date = new Date();
    $('#year').text(date.getFullYear());

    // Set the clock mode
    $('.modeButton').click(function() {

        // Toggle button fade ammounts
        $(this).fadeTo(500, .8);
        $(this).siblings().fadeTo(500, .4);

        // Instantiate the date object
        date = new Date();

        if ($(this).hasClass('time')) {

            // Set the clock mode
            clockMode = 'time';

            // Set the time variable
            var time  = getTime(date, twelveHour);

        } else if ($(this).hasClass('hex')) {

            // Set the clock mode
            clockMode = 'hex';

            // Set the time variable
            var time = hexToTime(getHex(date, ':'));

        }

        // Update the time
        render(time);

    });

    // Set the hour mode on click
    $('#clockMode').click(function() {

        // Toggle the hour mode
        if (twelveHour == true) {
            // Set twenty-four hour mode
            twelveHour = false;
            $(this).children('.text').text('24H');
        } else {
            // Set twelve hour mode
            twelveHour = true;
            $(this).children('.text').text('12H');
        }

        // Instantiate the date object
        date = new Date();

        // Set some variables
        var time = getTime(date, twelveHour);

        // Update the time
        render(time);

        return false;

    });

    // Hide text on click
    $('#hideText').click(function(){
        $('.hideMe').fadeOut();
        return false;
    });

    // Resize font on window resize
    $(window).resize(function(){
        clockScale();
    });

});

function render(time) {
  $('#clock .text#hours').text(time.hours);
  $('#clock .text#minutes').text(time.minutes);
  $('#clock .text#seconds').text(time.seconds);
};
function getTime(date, twelveHour) {

    // Set the date variable
    var currentTime = date;

    // Set the hours, minutes and seconds to variables
    var hours   = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if (twelveHour) {
        if (hours > 12) {
            hours = hours - 12;
        }
    }

    // Fix variables when < 10
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10){ minutes = "0" + minutes; }
    if (seconds < 10){ seconds = "0" + seconds; }

    // Construct a string of the current time
    var time =
      {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };

    // Return the time string
    return time;

}

function getHex(date, separator) {

    // Set the separator to nothing by default
    if (typeof separator == 'undefined') {
        separator = '';
    }

    // Instantiate the date object
    var currentTime = date;

    // Set the hours, minutes and seconds to variables
    var hours   = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // Set the hours, minutes and seconds to variables
    var r = Math.round(hours * (255 / 23));
    var g = Math.round(minutes * (255 / 59));
    var b = Math.round(seconds * (255 / 59));

    // Convert decimal to hex
    var r = r.toString(16);
    var g = g.toString(16);
    var b = b.toString(16);

    // Fix string lengths if needed
    if (r.length < 2) { r = '0' + r; }
    if (g.length < 2) { g = '0' + g; }
    if (b.length < 2) { b = '0' + b; }

    // Construct the hex string
    var hex = r + separator + g + separator + b;

    // Convert string to uppercase
    var hex = hex.toUpperCase();

    // Return the color string
    return {
      r: r,
      g: g,
      b: b
    };

}

function setBackgroundColor(color, fade) {

    // Set color variable
    var hex = hexToColor(color);
    console.log(color);

    if(fade == true) {
        $('#hours').animate({ backgroundColor: '#' + color.r  + '0000'}, 500);
        $('#minutes').animate({ backgroundColor: '#' + color.g  + '0000'}, 500);
        $('#seconds').animate({ backgroundColor: '#' + color.b  + '0000'}, 500);
    } else {
        $('#hours').css('background-color', '#' + color.r + '0000');
        $('#minutes').css('background-color', '#' + color.g + '0000');
        $('#seconds').css('background-color', '#' + color.b + '0000');
    }

}

function hexToTime(hex) {
  return hex['r'] +  ':' + hex['g'] +  ':' + hex['b'];
}
function hexToColor(hex) {
  return hex['r'] + hex['g'] + hex['b'];
}

function clockScale() {

    // Set some variables
    var scaleSource = $('body').width();
    var scaleFactor = .12;
    var maxScale    = 200;
    var minScale    = 50;

    // Multiply the width of the body by the scaling factor
    var fontSize = scaleSource * scaleFactor;

    //Enforce the minimum and maximums
    if (fontSize > maxScale) fontSize = maxScale;
    if (fontSize < minScale) fontSize = minScale;

    // Set the new font size
    $('#clock .text').css('font-size', fontSize + '%');

    // Set the new top margin
    var topMargin = $('#clock').height() / 2 + $('.modeButtonWrapper').height();
    $('#clock').css('margin-top', '-' + topMargin + 'px');

    // Set the new left margin
    var leftMargin = $('#clock').width() / 2;
    $('#clock').css('margin-left', '-' + leftMargin + 'px');

}
