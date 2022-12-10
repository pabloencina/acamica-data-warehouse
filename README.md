# acamica data-warehouse

It is a web application that allows CRUD operations to be carried out on a contact database that includes their personal data, their preferences, contact information, where they work, and where they live.

## Prerequisites

* Clipboard Code Editor (Visual Studio Code or similar)

* NodeJS

* Docker and Docker Compose (Optional)

## Installation

#### Step 1

Create a local folder to host the repository

#### Step 2

Go to the created folder and clone the repository:

`git clone https://github.com/pabloencina/acamica-data-warehouse.git`

Or download from Github site as .zip

With this you will have created the file structure and the content of the Frontend of the application.

#### Step 3

If you want to modify the code and run the project locally, enter your Code editor (Visual Studio Code).

Open a terminal window and position yourself in the local folder that you created and within it in the "acamica-datawarehouse" folder.

Type `npm install`. With that you will have installed all the necessary dependencies.

#### Step 4

Run `npm run dev`. This will start up the web application in the http://localhost:3000. You can use this url to test the application locally.

#### Step 5 (deploy)

There are two suggested options to deploy the application. For more information see: [Deployment | Next.js](https://nextjs.org/docs/deployment)

##### Option 1: Node.js Server

In a server machine with Node.js installed, clone this repo and run `next build` to build the application. Then, run `next start` to start the Node.js server

##### Option 2: Docker

In a server machine with Docker and Docker compose installed, clone this repo and run `docker-compose up --build`.  This will create a docker container with the application running.

## Technologies

* React.js 17.0.2

* Material UI 5.4.3

* Node.js 16.0.0

## Credits

* Template use this project: [Devias Kit - React Admin Dashboard](https://mui.com/store/items/devias-kit/).

* Special thanks to [santiagocerrutti](https://github.com/santiagocerrutti) for his support in all the development process.

## Author

Pablo David Encina