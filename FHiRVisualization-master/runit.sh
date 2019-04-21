#!/bin/bash
export PORT=8000;
export SECRET=hello;
export MONGODB_LOCAL=mongodb://admin:myadminpassword@fhirfli.uk.to:27017/admin;

npm run development;
