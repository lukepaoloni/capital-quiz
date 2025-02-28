# Capital Quiz

## Prerequisites
- PHP 8.3
- Composer 2
- NVM or Node v22.14.0

## Steps to Run
Run the following commands to install dependencies and to serve Capital Quiz app:

```shell
git clone git@github.com:lukepaoloni/capital-quiz.git
cd capital-quiz
nvm install
npm ci
composer install
composer run dev
```

## Run Tests
```shell
php aritsan test
```

## Improvements
- Server-side provides translatable text, but client-side still only supports English
- Create a data object for countries' information
- Improve naming inconsistencies
- Mock the CountriesNow API so tests run faster
- Separate the concerns of the frontend a bit more
- Utilise Typescript for React frontend to adhere to strict types
- Combine state props to a state object
