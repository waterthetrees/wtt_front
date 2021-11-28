echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /var/www/html/dev.waterthetrees.com/wtt_front

echo "Update app from Git"
git pull

echo "Install app dependencies"
rm -rf node_modules package-lock.json
yarn install

echo "Build your app"
npm run build

echo "Run new PM2 action"
# sudo cp /home/ubuntu/ecosystem.json ecosystem.json
pm2 reload ecosystem.config.js --env development --name wtt_front
