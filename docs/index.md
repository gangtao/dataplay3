<p align="center">
  <a href="https://github.com/gangtao/dataplay3/issues">
    <img src="https://img.shields.io/github/issues/gangtao/dataplay3.svg">
  </a>
  <a href="https://github.com/gangtao/dataplay3/network">
    <img src="https://img.shields.io/github/forks/gangtao/dataplay3.svg">
  </a>
  <a href="https://github.com/gangtao/dataplay3/stargazers">
    <img src="https://img.shields.io/github/stars/gangtao/dataplay3.svg">
  </a>
  <a href="https://app.codacy.com/app/gangtao/dataplay3?utm_source=github.com&utm_medium=referral&utm_content=gangtao/dataplay3&utm_campaign=Badge_Grade_Settings">
    <img src="https://api.codacy.com/project/badge/Grade/8e46d2bc99bc4dad990af063c26efb00">
  </a>
  <a href="https://ebertapp.io/github/gangtao/dataplay3">
    <img src="https://ebertapp.io/github/gangtao/dataplay3.svg">
  </a>
</p>

<p align="center">
  A small all in one data science tool
</p>

# dataplay3

### Quick Start
To build your own dataplay3 container, run
```bash
make docker
```
and then start the dataplay3 in a container with
```bash
make run
```
open [http://localhost:8000](http://localhost:8000) to access dataplay3 ui.

### Feature Overview

Main feature of dataplay3 includes:
- Dataset management
- Dataset query
- Data visualization
- A Simple dashboard
- Categorical data prediction
- Numerical data prediction
- Time serials data prediction

### Architecture

### Development

#### Client
Dataplay3 client is based on [ant design pro](https://pro.ant.design/). To build the client, you need have [node](https://nodejs.org/en/) installed.

To develop the client, first install all dependencies.

```bash
cd client
npm install
```
[yarn](https://yarnpkg.com/en/) can be used for dependency management as well.

Start the client
```bash
npm run start
```

To build the client and copy all the output client code to the static directory of the server
```bash
npm run build
``` 

More client build options refer to `dataplay3/client/package.json` 

#### Server
Dataplay3 server is based on Python3 and [Sanic](https://github.com/huge-success/sanic). 

To setup server development environment, you need Python3 and pip. It is recommended to using virtual env to manage your python environment.  Run following command to create your python virtual environment. 
```bash
python -m venv .venv
source .venv/bin/activate
```

Install development dependency
```bash
cd server
pip install -r dev-requirements.txt
```

And then use doit to install all the dependencies for dataplay3 server.
```bash
doit install_dep
```

To start the dataplay server, run
```bash
doit server
```

To access open api doc, visit [http://localhost:8000/swagger/](http://localhost:8000/swagger/)

for more build options of server, run
```bash
doit list
```
