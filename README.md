![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Open Source Love png2](https://badges.frapsoft.com/os/v2/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/MichiBeutler/Instagram-Clone/graphs/commit-activity)
[![GitHub contributors](https://img.shields.io/github/contributors/MichiBeutler/Instagram-Clone.svg)](https://GitHub.com/MichiBeutler/Instagram-Clone/graphs/contributors/)

#  :camera: Instagram Clone

Everyone knows the famous social media platform [Instagram](https://instagram.com). For a school project i tried to recreate this platform and tried to write a web app with similar functions and look and feel.

> Instagram is a photo and video-sharing social networking service owned by Facebook, Inc. It was created by Kevin Systrom and Mike Krieger, and launched in October 2010 exclusively on iOS.
[Wikipedia](https://en.wikipedia.org/wiki/Instagram)

Instagram is build with Django so i used Django too for this project. I hope you enjoy it and mabye learnd something new.

:mag_right: [Screenshots](https://github.com/MichiBeutler/Instagram-Clone/blob/master/sreenshots/screenshots.md)

Press F to pay respect to glorious developer.

## :checkered_flag: Getting started
Install this app like discribed in the manual below, creat a superuser and get started.

After installing you can access [http://localhost:8000/](http://localhost:8000/).

## :package: Prerequisites

* [Django 2.1](https://www.djangoproject.com/)
* [Python 3](https://www.python.org)

## :rocket: Installation
At first you have to clone the git reprository in your directory:
```
git clone https://github.com/MichiBeutler/Instagram-Clone.git
```

Django uses Python so you have to install this first if its not already installed.

Download Python for Windows: [Download](https://www.python.org/downloads/windows/)

Download Python for Mac OS X: [Download](https://www.python.org/downloads/mac-osx/)

Download Python for Linux: `$ sudo apt-get install python`


If Django 2.1 is not installed or not the correct version you can install it by using `pip install django`

Maybe you also have to install Pillow by using `pip install pillow`

For easy installation you can run the install script after you installed [Python 3](https://www.python.org) and [Django 2.1](https://www.djangoproject.com/).

```
# Windows
install.cmd

# Linux
install.sh
```
![Install Script Screenshot](https://github.com/MichiBeutler/Instagram-Clone/blob/master/sreenshots/install.cmd.jpg)

The script creates the database and the needed tables. After you have to create a superuser for accessing the admin site. The install script creates one for you.

Just type your username, email and password when asked and the server starts after that.

After installing you can access [http://localhost:8000/admin/](http://localhost:8000/admin/) and add at least one location to the dataset. Just log in with your created superuser and navigate to locations and press add. Now its up to you what your first location will be called like. Keep in mind that your location must also provide a slug. This is just your locationname with no spaces and small charakters.

Now you can use this app by navigate to [http://localhost:8000/](http://localhost:8000/) and use this app.

## :books: Built With

* [Bootstrap](https://getbootstrap.com/) - The web framework used
* [JQuery](https://jquery.com/)

## :octocat: Authors
* **Michael Beutler** - *initial work* - [MichiBeutler](https://github.com/MichiBeutler)

See also the list of [contributors](https://github.com/MichiBeutler/Instagram-Clone/graphs/contributors) who participated in this project.

## :lock: License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/MichiBeutler/Instagram-Clone/blob/master/LICENSE) file for details
      
## :ok_hand: Acknowledgments
Feel free to fork this repro and add your own functions!
* you can create your own social media platform and also add some additionals feautrs to instagram :stuck_out_tongue_closed_eyes:


![Feed Screenshot](https://github.com/MichiBeutler/Instagram-Clone/blob/master/sreenshots/feed.jpg)
