$(document).ready(function() {
   /* This implements jQuery.UI accordian menu
   $("#introAccordion").accordion(); */

   /* This is the non jQueryUI method: */
   $('.introDiv').hide();
   $('.introActive').next('div').show();

   $('.introHeader').on('click', function() {
     /* Remove all header that have class 'introActive' */
      $('#introAccordion')
        .find('.introHeader').removeClass('introActive');
     /* hide all introDiv classes in this accordian */
      $('#introAccordion')
        .find('.introDiv').hide('slow');
      //show the next DIV under the header just clicked:
      $(this).next('div').show('slow');
      //set the class="introActive" for this header:
      $(this).addClass('introActive');
   }); //end introHeaderDiv.click

   $('.infoBox').on('click', function() {
      /* whenever they click on a bookmark (learnBox),
         go to the link stored in the .learnBoxBotURL: */
       var $sURL = $(this).find('a');
       if ($sURL.attr('href').length > 0) {
         //alert("Going to URL: " + $sURL.attr('href'));
         window.location.href = $sURL.attr('href');
      };
   });

   $('.learnBox').on('click', function() {
      /* whenever they click on a bookmark (learnBox),
         go to the link stored in the .learnBoxBotURL: */
       var $sURL = $(this).find('a');
       if ($sURL.attr('href').length > 0) {
         //alert("Going to URL: " + $sURL.attr('href'));

         // Hmmm, this causes an infinite loop!
         //$sURL.click(); /* go to this valid URL link */

         /* NOTE: window.location.href sets in SAME window */
         window.open($sURL.attr('href'));
      };
    });
});
