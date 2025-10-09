cd ~/My-Prodaction
npm run build:prod

rm -rf ~/../var/www/My-Prodaction/html
mv ~/My-Prodaction/build ~/../var/www/My-Prodaction/html
