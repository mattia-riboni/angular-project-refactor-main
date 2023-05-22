## City-Network

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
   <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project
![City-network](/src/assets/screenshot.png)

This start2impact (for NTTData) project has been made to help to connect people in cities, sharing local news, events, informations, sport and so more. The usage of this app is really easy thanks to his social network look. To have a look without install the project and run it locally, here's a [web version](https://angular-project-s2i.netlify.app/login) deployed with [Netlify](https://www.netlify.com/)  

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Angular][Angular.io]][Angular-url]

* [![Ionic][Ionicframework.com]][Ionic-url]

* [![Firebase][Firebase.google.com]][Firebase-url]

* [![GoRest][GoRest.co.in]][GoRest-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
You should:
-   Have a stable version of Node.js installed.
-  Have Angular CLI installed. If not run the following command:

	```sh
	$ npm  install  -g  @angular/cli|  
	``` 



### Installation

 1. First, create a folder. Remember to go to the folder with the following command:

	```sh
	 cd folder
	 ``` 

 2. Clone the repo

	   ```sh
	   https://github.com/mattia-riboni/Ng-city-network  
    ```
   
 3. Install NPM packages
	   ```sh
	   npm install
	   ```
 
 4. Use the following command (also available inside `package.json`):
	 - `ng serve` to start the app, then open **[http://localhost:4200/](http://localhost:4200/)** in your browser
	 - `ng build` to build the app
	 - `ng test` to test the app
	 - `ng test --no-watch --code-coverage` to get the code coverage

 
 

  


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

The usage is made very simple thanks to a similarity to come of the most famous social-networks. There are three bigger sections:

 - Posts: here you can see the most relevant posts. Any post can be commented and liked clicking on his relative button.
 - Users: there is a list of user (generated with GoRest, only for example purposes). Any user can be clicked to reach his personal page, where information and post can be edited or created. The two buttons on top allow the creation or elimination of a user 
 
 Every section is protected by authentiction, users can login or register in the dedicated section, on top right; the logout button is shown only if the user is already logged, in the same position of login/register button.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Mattia Riboni - mattiariboni@gmail.com

Project Link: [https://github.com/mattia-riboni/Ng-city-network  ](https://github.com/mattia-riboni/Ng-city-network  )

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Ionicframework.com]: https://img.shields.io/badge/Ionic-20232A?style=for-the-badge&logo=ionic&logoColor=61DAFB
[Ionic-url]: https://ionicframework.com/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Firebase.google.com]: https://img.shields.io/badge/Firebase-FEE80B?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
[GoRest.co.in]: https://img.shields.io/badge/GoRest-96BE25?style=for-the-badge&logo=turtle&logoColor=white
[GoRest-url]: https://gorest.co.in
