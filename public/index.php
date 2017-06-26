<?php require '../app/app.php'; ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pats PHP/mySQL Development</title>
    <link rel="icon" href="patslogo.ico" type="image/x-icon">
    <link href="css/homeStyle.css" rel="stylesheet">
  </head>
  <body>
  <?php include('../views/header.php'); ?>
  <?php include('../views/contentMain.php'); ?>
  <?php OutputValidatorObject() ?>
  <?php include('../views/footer.php'); ?>
  <script type="text/javascript" src="js/index.js"></script>
  </body>
</html>
