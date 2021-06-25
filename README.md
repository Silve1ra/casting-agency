<h4 align="center">
  🚀 Casting Agency
</h4>

<p align="center">
  
  <a href="https://github.com/Silve1ra/casting-agency/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Silve1ra/casting-agency">
  </a>

  <a href="https://github.com/Silve1ra/casting-agency/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Silve1ra/casting-agency">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

This project is a casting agency to operate movies and actors. 
All backend code follows [PEP8 style guidelines](https://www.python.org/dev/peps/pep-0008/). 

## 💭 Getting Started

### Pre-requisites and Local Development 
Developers using this project should already have Python3, pip and node installed on their local machines.

#### Documentation
To access the documentation do the following commands:
```
cd docs
npx serve -p 4000
```

The documentation is run on `http://127.0.0.1:4000/`

#### Backend

To run the application run the following commands: 
```
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```
or (Windows 10 PowerShell):
```
$env:FLASK_APP='flaskr'
$env:FLASK_ENV='development'
flask run
```

The application is run on `http://127.0.0.1:5000/` by default.

#### Frontend

From the frontend folder, run the following commands to start the client: 
```
npm install // only once to install dependencies
npm start 
```

By default, the frontend will run on localhost:3000. 

### ✔ Tests
In order to run tests navigate to the backend folder and run the following commands: 

```
python test_app.py
```

### 💻 Endpoints summary

local URL: `curl https://casting-agency-api-silve1ra.herokuapp.com/`
deployed URL: `curl http://127.0.0.1:5000/`

#### GET /actors
#### GET /actors/:id
#### POST /actors
#### DELETE /actors/:id

#### GET /movies
#### GET /movies/:id
#### POST /movies
#### DELETE /movies/:id

### ⛔ Error Handling
Errors are returned as JSON objects in the following format:
```
{
    "success": False, 
    "error": 400,
    "message": "bad request"
}
```
The API will return three error types when requests fail:
- 400: Bad Request
- 404: Resource Not Found
- 422: Not Processable 

## 🤔 How to Contribute

- Clone the project: `git clone git@github.com:Silve1ra/casting-agency.git`;
- Create your branch with your feature: `git checkout -b my-feature`;
- Commit your feature: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push -u origin my-feature`.

After the merge of your pull request is done, you can delete your branch.

## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.


## 🍸 Acknowledgements 
The awesome Udacity Nanodegree helping me to be an extraordinary full stack developer! 

---

Made with ♥ by <tr>
    <td align="center"><a href="https://github.com/silve1ra"><b>Felipe Silveira</b></a><br /></td>
<tr>
