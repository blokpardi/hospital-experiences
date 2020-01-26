/// <reference path = "/html/js/jquery-1.8.2.intellisense.js"/>
/// <reference path = "/html/js/knockout-2.2.0.debug.js"/>

///// Object classes

var State = function (stateName, stateAbbr) {
    this.stateName = stateName;
    this.stateAbbr = stateAbbr;
}

var Hospital = function (name, provider, address, city, state, zip, rr, scomp, ntrating, serating, sixrating, dreco, preco, nreco, aquiet, uquiet, squiet, ghi, nhi, acontrolled, ucontrolled, ncontrolled, aclean, uclean, nclean,adc,udc,ndc,anc,unc,nnc,ahelp,uhelp,nhelp,umed,amed,nmed) {
    this.hospitalName = name;
    this.providerNumber = provider;
    this.hospitalAddress = address;
    this.hospitalCity = city;
    this.hospitalState = state;
    this.hospitalZip = zip;
    this.responseRate = rr,
    this.surveysCompleted = scomp;
    this.nineOrTenRating = ntrating;
    this.sevenOrEightRating = serating;
    this.sixOrLowerRating = sixrating;
    this.definitelyRecommend = dreco;
    this.probablyRecommend = preco;
    this.notRecommend = nreco;
    this.alwaysQuiet = aquiet;
    this.usuallyQuiet = uquiet;
    this.sometimesQuiet = squiet;
    this.givenHomeInfo = ghi;
    this.noHomeInfo = nhi;
    this.alwaysPainControlled = acontrolled;
    this.usuallyPainControlled = ucontrolled;
    this.neverPainControlled = ncontrolled;
    this.alwaysClean = aclean;
    this.usuallyClean = uclean;
    this.neverClean = nclean;
    this.alwaysDocComm = adc;
    this.usualDocComm = udc;
    this.neverDocComm = ndc;
    this.alwaysNurseComm = anc;
    this.usualNurseComm = unc;
    this.neverNurseComm = nnc;
    this.alwaysHelped = ahelp;
    this.usuallyHelped = uhelp;
    this.neverHelped = nhelp;
    this.usualMed = umed;
    this.alwaysMed = amed;
    this.neverMed = nmed
}

var hospitalsVM = {
    hospitals: []
};

var stackpage = function (pageId, pageTitle) {
    this.pageId = pageId;
    this.pageTitle = pageTitle
}

var _backstack = {stackpages:[]}

$(document).ready(function () {
    setStates();
    showStates();
    //showHospitals('AL');
});

function newHospitals() {
    var vmlen = hospitalsVM.hospitals.length;
    hospitalsVM.hospitals.splice(0, hospitalsVM.hospitals.length);
}

function setStates()
{
    var viewModel = {
        states: [
            new State("Alabama", "AL"),
            new State("Alaska", "AK"),
            new State("Arizona", "AZ"),
            new State("Arkansas", "AR"),
            new State("California", "CA"),
            new State("Colorado", "CO"),
            new State("Connecticut", "CT"),
            new State("Delaware", "DE"),
            new State("Florida", "FL"),
            new State("Georgia", "GA"),
            new State("Hawaii", "HI"),
            new State("Idaho", "ID"),
            new State("Illinois", "IL"),
            new State("Indiana", "IN"),
            new State("Iowa", "IA"),
            new State("Kansas", "KS"),
            new State("Kentucky", "KY"),
            new State("Louisiana", "LA"),
            new State("Maine", "ME"),
            new State("Maryland", "MD"),
            new State("Massachusetts", "MA"),
            new State("Michigan", "MI"),
            new State("Minnesota", "MN"),
            new State("Mississippi", "MS"),
            new State("Missouri", "MO"),
            new State("Montana", "MT"),
            new State("Nebraska", "NE"),
            new State("Nevada", "NV"),
            new State("New Hampshire ", "NH"),
            new State("New Jersey", "NJ"),
            new State("New Mexico", "NM"),
            new State("New York", "NY"),
            new State("North Carolina", "NC"),
            new State("North Dakota", "ND"),
            new State("Ohio", "OH"),
            new State("Oklahoma", "OK"),
            new State("Oregon", "OR"),
            new State("Pennsylvania", "PA"),
            new State("Rhode Island", "RI"),
            new State("South Carolina", "SC"),
            new State("South Dakota", "SD"),
            new State("Tennessee", "TN"),
            new State("Texas", "TX"),
            new State("Utah", "UT"),
            new State("Vermont", "VT"),
            new State("Virginia", "VA"),
            new State("Washington", "WA"),
            new State("West Virginia", "WV"),
            new State("Wisconsin", "WI"),
            new State("Wyoming", "WY")
        ]
    };

    ko.applyBindings(viewModel, document.getElementById("state-list"));
    setClick();
}

function setClick() {
    $('[data-clicktype]').unbind('click');
    $('[data-clicktype]').click(function () {
        itemClick($(this));
        event.preventDefault();
    });
}
function showStates() {
    pageNav(new stackpage("#state-list", "pick a state"));
}

function showAbout() {
    pageNav(new stackpage("#about-page", "about"));
}


function showHospitals(state) {
    waitOn();
    var element = $("#hospital-list");
    ko.cleanNode(element);
    var url = "http://data.medicare.gov/resource/rj76-22dk.json?state=" + state + "&$order=city";
    
    $.getJSON(url)
        .done(function (json) {
            $.each(json, function () {
                //alert(this.provider_number)
                hospitalsVM.hospitals.push(new Hospital(
                    this.hospital_name,
                    this.provider_number,
                    this.address_1,
                    this.city,
                    this.state,
                    this.zip_code,
                    this.survey_response_rate_percent,
                    this.number_of_completed_surveys,
                    this.percent_of_patients_who_gave_their_hospital_a_rating_of_9_or_10_on_a_scale_from_0_lowest_to_10_highest_,
                    this.percent_of_patients_who_gave_their_hospital_a_rating_of_7_or_8_on_a_scale_from_0_lowest_to_10_highest_,
                    this.percent_of_patients_who_gave_their_hospital_a_rating_of_6_or_lower_on_a_scale_from_0_lowest_to_10_highest_,
                    this.percent_of_patients_who_reported_yes_they_would_definitely_recommend_the_hospital_,
                    this.percent_of_patients_who_reported_yes_they_would_probably_recommend_the_hospital_,
                    this.percent_of_patients_who_reported_no_they_would_not_recommend_the_hospital_,
                    this.percent_of_patients_who_reported_that_the_area_around_their_room_was_always_quiet_at_night_,
                    this.percent_of_patients_who_reported_that_the_area_around_their_room_was_usually_quiet_at_night_,
                    this.percent_of_patients_who_reported_that_the_area_around_their_room_was_sometimes_or_never_quiet_at_night_,
                    this.percent_of_patients_who_reported_that_yes_they_were_given_information_about_what_to_do_during_their_recovery_at_home_,
                    this.percent_of_patients_who_reported_that_they_were_not_given_information_about_what_to_do_during_their_recovery_at_home_,
                    this.percent_of_patients_who_reported_that_their_pain_was_always_well_controlled_,
                    this.percent_of_patients_who_reported_that_their_pain_was_usually_well_controlled_,
                    this.percent_of_patients_who_reported_that_their_pain_was_sometimes_or_never_well_controlled_,
                    this.percent_of_patients_who_reported_that_their_room_and_bathroom_were_always_clean_,
                    this.percent_of_patients_who_reported_that_their_room_and_bathroom_were_usually_clean_,
                    this.percent_of_patients_who_reported_that_their_room_and_bathroom_were_sometimes_or_never_clean_,
                    this.percent_of_patients_who_reported_that_their_doctors_always_communicated_well_,
                    this.percent_of_patients_who_reported_that_their_doctors_usually_communicated_well_,
                    this.percent_of_patients_who_reported_that_their_doctors_sometimes_or_never_communicated_well_,
                    this.percent_of_patients_who_reported_that_their_nurses_always_communicated_well_,
                    this.percent_of_patients_who_reported_that_their_nurses_usually_communicated_well_,
                    this.percent_of_patients_who_reported_that_their_nurses_sometimes_or_never_communicated_well_,
                    this.percent_of_patients_who_reported_that_they_always_received_help_as_soon_as_they_wanted_,
                    this.percent_of_patients_who_reported_that_they_usually_received_help_as_soon_as_they_wanted_,
                    this.percent_of_patients_who_reported_that_they_sometimes_or_never_received_help_as_soon_as_they_wanted_,
                    this.percent_of_patients_who_reported_that_staff_usually_explained_about_medicines_before_giving_it_to_them_,
                    this.percent_of_patients_who_reported_that_staff_always_explained_about_medicines_before_giving_it_to_them_,
                    this.percent_of_patients_who_reported_that_staff_sometimes_or_never_explained_about_medicines_before_giving_it_to_them_
                    ));
            })
            hospitalsVM.hospitals.sort(function(a,b) {
                return a.hospitalCity > b.hospitalCity
            })             
            ko.applyBindings(hospitalsVM, document.getElementById("hospital-list"));
            setClick();
            pageNav(new stackpage("#hospital-list", "hospitals"));
            waitOff();
        })
        .fail(function () {
            waitOff(); 
            pageNav(new stackpage("#neterror-page", "oops!"))
        });
}


function showHospital(pnum) {
    waitOn();
    var element = $("#hospital-page");
    ko.cleanNode(element);
    var url = "http://data.medicare.gov/resource/rj76-22dk.json?provider_number=" + pnum;
    var selectedHospital = hospitalsVM.hospitals.filter(function (hospital) { return hospital.providerNumber == pnum });
    var viewModel = {
        hospital: [ selectedHospital[0] ]
    };
    
    ko.applyBindings(viewModel, document.getElementById("hospital-page"));
    pageNav(new stackpage("#hospital-page", selectedHospital[0].hospitalName.toLowerCase()));
    $("#hospitalPhone").mask("(999) 999-9999");
    waitOff();
}

function showPage(pageId, pageTitle, fdirection) {
    fdirection = typeof fdirection !== 'undefined' ? fdirection : "right";
    $('html, body').animate({ scrollTop: 0 }, 0);
    $('*[data-role="page"]').hide();
    $("#page-title").html(pageTitle);
    $(pageId).show("slide", { direction: fdirection, easing: 'easeOutQuint' }, 1000);
}

function itemClick(obj) {
    if ($(obj).data('clicktype') == "state") {
        showHospitals($(obj).data('id'));
    }
    if ($(obj).data('clicktype') == "hospital") {
        showHospital($(obj).data('pnum'));
    }
}

function waitOn() {
    $('#wp-waiting').show();
}

function waitOff() {
    $('#wp-waiting').hide();
}

function pageNav(spage) {
    waitOff();
    if (spage != "null") {
        _backstack.stackpages.push(spage);
        showPage(spage.pageId, spage.pageTitle);
    }
    else {
        _backstack.stackpages.pop();
        var ln = _backstack.stackpages.length - 1;
        var pg = _backstack.stackpages[ln];
        
        //reset hospital list if going back to select a new state
        if (pg.pageId == "#state-list")
            newHospitals();
        showPage(pg.pageId, pg.pageTitle, "left");
    }

    if (_backstack.stackpages.length-1 == 0) {
        try {
            AndroidFunction.backstackoff();
        }
        catch (err) {
            window.external.notify("backstackoff");
        }
    }
    else
        try {
            AndroidFunction.backstackon();
        }
        catch (err) {
            window.external.notify("backstackon");
        }
}