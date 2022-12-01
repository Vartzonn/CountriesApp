<?php 
  $pseudoPattern = "/^[a-zA-Z0-9]{3,20}$/";
  $passwordPattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/";
  $mailPattern = "/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/";
  
  $htmlPseudoPattern = str_replace('/', '', $pseudoPattern);
  $htmlPasswordPattern = str_replace('/', '', $passwordPattern);
  $htmlMailPattern = str_replace('/', '', $mailPattern);
?>