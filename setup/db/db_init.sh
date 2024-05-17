#!/bin/bash

mysql -u "$DB_USER" -p"$DB_PASS" < mysql/init.sql < mysql/seed.sql