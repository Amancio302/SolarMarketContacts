# Instruções iniciais

É necessário que possua o Node e Docker instalados (ambos em LTS)

Para iniciar o banco de dados MySql

```sh
docker run --name solarmarketcontactsdb -e MYSQL_ROOT_PASSWORD=solar-market-secret -e MYSQL_DATABASE=SolarMarketContacts -e MYSQL_USER=SolarMarket -e MYSQL_PASSWORD=solar-market-secret -p 3306:3306 -d mysql
```

Para criá-lo e populá-lo

```sh
cd back
npm run typeorm migration:run
```

Após isso, basta iniciar o servidor node
```sh
npm run dev
```

O servidor estará em http://localhost:8000

Para o frontend, basta abrir outro terminal, acessar sua pasta e inicializá-lo
```sh
cd front
npm run serve
```

O frontend estará em http://localhost:8080