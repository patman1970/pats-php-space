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
