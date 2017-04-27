$(function () {
    var b_checkin_day = $('#b_checkin_day' + y),
        b_checkin_month = $('#b_checkin_month' + y),
        b_checkout_day = $('#b_checkout_day' + y),
        b_checkout_month = $('#b_checkout_month' + y);

    var selector_from = '#b_checkin_from' + y,
        selector_to = '#b_checkin_to' + y;

    console.log(y);

    var dateFormat = "dd MM `y",
        from = $(selector_from)
            .datepicker({
                dateFormat: "dd MM `y",
                changeMonth: true,
                numberOfMonths: 1
            })
            .datepicker("setDate", new Date())
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this, 'from'));
            }),
        to = $(selector_to)
            .datepicker({
                dateFormat: "dd MM `y",
                changeMonth: true,
                numberOfMonths: 1
            })
            .datepicker("setDate", +1)
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this, 'to'));
            });
    y += 1;
    function getDate(element, fromto) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        switch (fromto) {
            case 'from':
                b_checkin_day.val(date.getDate().toString());
                b_checkin_month.val(date.getFullYear() + '-' +(date.getMonth()+1));
                break;
            case 'to':
                b_checkout_day.val(date.getDate().toString());
                b_checkout_month.val(date.getFullYear() + '-' +(date.getMonth()+1));
                break;
        }
        return date;
    }
});