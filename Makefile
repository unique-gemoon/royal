start:
		docker-compose up -d --build --remove-orphans
build:
		docker-compose stop -v && docker-compose build --no-cache
restart:
		docker-compose down -v && docker-compose up -d --build --remove-orphans
light_restart:
		docker-compose restart
stop:
		docker-compose stop -v
build_reactjs:
		docker-compose up -d --no-deps --build reactjs 
