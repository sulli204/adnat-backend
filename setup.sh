bundle install
rails db:drop:_unsafe
rails db:migrate
rails db:seed

cd adnat-frontend
npm install
npm install spa-http-server
npm run build