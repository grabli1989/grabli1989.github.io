// Create the form markup using parameters passed in the URL
// aid => b_aid
// hotel_id => s_raw_param_hotel_id
// hotel_page => s_raw_param_hotel_page
// hotel_cc1 => s_raw_param_cc1
// skin => s_raw_param_skin
// lang
// disable => s_raw_param_disable
// powered => s_raw_param_powered
var form_markup = '';
form_markup += ' <div id="b_editDates"> ';
form_markup += ' <h3>When would you like to stay?</h3> ';
form_markup += ' <form id="b_availFrm" class="b_availForm" action="https://bookitbutton.booking.com/hotel/il/ben-yehuda-apartments.en.html" method="get"> ';
form_markup += ' <div class="b_availFormInner"> ';
form_markup += ' <input type="hidden" name="aid" value="330843"/> ';
form_markup += ' <input type="hidden" name="hotel_id" value="24496"/> ';
form_markup += ' <input type="hidden" name="lang" value="en"/> ';
form_markup += ' <input type="hidden" name="pb" value=""/> ';
form_markup += ' <input type="hidden" name="stage" value="0"/> ';
form_markup += ' <input type="hidden" name="hostname" value="bookitbutton.booking.com"/> ';
form_markup += ' <input type="hidden" id="b_checkin_day" name="checkin_monthday" value="0" /> ';
form_markup += ' <input type="hidden" id="b_checkin_month" name="checkin_year_month" value="0" /> ';
form_markup += ' <input type="hidden" id="b_checkout_day" name="checkout_monthday" value="0" /> ';
form_markup += ' <input type="hidden" id="b_checkout_month" name="checkout_year_month" value="0" /> ';
form_markup += ' <div class="b_availDatesInner"> ';
form_markup += ' <h4>Check-in date</h4> ';
form_markup += ' <div id="b_availCheckIn"> ';
form_markup += ' <input type="text" id="b_checkin_from" style="background: #FFFFFF;border: 1px solid #CCCCCC;color: #333;font-size: 100%;padding: 2px;" name="checkin">';
form_markup += ' </div> ';
form_markup += ' </div> ';
form_markup += ' <div class="b_availDatesInner"> ';
form_markup += ' <h4>Check-out date</h4> ';
form_markup += ' <div id="b_availCheckOut"> ';
form_markup += ' <input type="text" id="b_checkin_to" style="background: #FFFFFF;border: 1px solid #CCCCCC;color: #333;font-size: 100%;padding: 2px;" name="checkout"> ';
form_markup += ' </div> ';
form_markup += ' </div> ';
form_markup += ' <div id="b_availSubmit"> ';
form_markup += ' <input type="submit" value="Check availability"/> ';
form_markup += ' </div> ';
form_markup += ' </div> ';
form_markup += ' </form> ';
form_markup += ' </div> ';
// Write the form markup to the page
document.write(form_markup);

document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>' +
    '<script type="text/javascript" src="script.js"></script>');

// If specified, load a CSS skin
var css_href = 'https://aff.bstatic.com/images/partner/330843/form.css';
var newcsslink = document.createElement('link');
newcsslink.setAttribute('type','text/css');
newcsslink.setAttribute('id','bb_skin');
newcsslink.setAttribute('href',css_href);
newcsslink.setAttribute('rel','stylesheet');
newcsslink.setAttribute('media','screen');
document.getElementsByTagName('head')[0].appendChild(newcsslink);
var css_href_jq = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css';
var newcsslinkjq = document.createElement('link');
newcsslinkjq.setAttribute('type','text/css');
newcsslinkjq.setAttribute('id','bb_skin_jq');
newcsslinkjq.setAttribute('href',css_href_jq);
newcsslinkjq.setAttribute('rel','stylesheet');
newcsslinkjq.setAttribute('media','screen');
document.getElementsByTagName('head')[0].appendChild(newcsslinkjq);