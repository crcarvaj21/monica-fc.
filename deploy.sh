#!/bin/bash\n# Script para actualizar el servidor web\nsudo rsync -av --delete /home/pi/monica-fc/ /var/www/html/ --exclude .git\nsudo chown -R www-data:www-data /var/www/html/
