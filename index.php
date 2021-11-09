<?php
include_once "index.html";

header("Content-Security-Policy: base-uri 'self';
connect-src 'self' https://wadgroup31-e83d0-default-rtdb.asia-southeast1.firebasedatabase.app;
default-src 'self';
font-src 'self' https://fonts.gstatic.com;
frame-src 'self';
img-src 'self' https://www.gstatic.com;
manifest-src 'self';
media-src 'self';
object-src 'none';
report-uri https://6189e6b457efdeabc05d1158.endpoint.csper.io/;
script-src  'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js;
style-src  'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css https://fonts.googleapis.com https://stackpath.bootstrapcdn.com https://www.gstatic.com
'sha256-eQVORhjny5bZw7SnSrUDnI4H0GV+DIG7n7UMrohWnps=' 'sha256-o8w/COZUxxk1YqNUesAyJl/MqdlJowzATI/JvM+1xFk=';
worker-src 'none';");
