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
report-uri https://6189f96b9faf992d41f26676.endpoint.csper.io/;
script-src 'report-sample' 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js https://www.gstatic.com/firebasejs/7.7.0/firebase-storage.js;
style-src 'report-sample' 'self' https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css https://fonts.googleapis.com https://stackpath.bootstrapcdn.com https://www.gstatic.com;
worker-src 'none';");
