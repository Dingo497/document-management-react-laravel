## Co projek robi
- prihlasenie pouzivatela, nahratie dokumentov a ich CRUD + download/store .pdf suborov
- filtrovanie dokumentov podla tagov
- strankovanie dokumentov
- po refreshi react aplikacie sa uchovaju udaje a tak sa dany pouzivatel neodhlasi a zaroven mu ostanu nastavene strankovania a filtre

## Pouzite technologie
- FIRST TOUCH: React, Typescript, Redux, React-router-dom
- Laravel ako backend api

## Male video k projektu
**[Odkaz na video TU](https://drive.google.com/drive/folders/1FzPYpKg9ivi6aB7KHwdy9mBMLd43GZqY?usp=sharing)**
(Kliknite na video s nazvom document-management-react-laravel)

## Ako spustit
1. git clone https://github.com/Dingo497/document-management-react-laravel
2. cd document-management-react-laravel
3. composer install
4. npm install
5. php artisan serve
6. npm run dev
7. pridanie .env suboru a jeho mozne nastavenie
8. zmena suboru resources/js/http/index.ts --> Konkretne podla vasich poziadaviek
9. php artisan migrate
10. php artisan db:seed
