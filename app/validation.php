<?php
//This lib is included in app.php's autoload.php
//instruction, used for extra data validation fn's:
use Respect\Validation\Validator;

function OutputValidatorObject() {
  echo "<h3>Calling \$v = new Validator</h3>";
  $v = new Validator;
  echo "<hr /><pre>";
  var_dump($v);
  echo "</pre><hr />";
}

function GetValidDateString($date_raw) {
  //use the Validator class to validate valid input:
  if (Validator::notEmpty()->validate($date_raw)) {
    //Format returns format: Jan 1st 2016, etc.
    return date('F jS Y', $date_raw);
  };
  //NOTE: can also do this:
  //$date_validator = Validator::date()->notEmpty();
  //if ($date_validator->validate($date_raw)) {...}
}
