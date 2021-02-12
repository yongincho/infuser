# Infuser / EXIF Analysis


Infuser is a web-based EXIF Image Metadata Analysis Tool. 

  - EXIF Library
  - Django-based Infrastructure
  - Frontend & Backend

### Step by Step Guide

---Will be updated soon!---

### Information Provided by Image Analysis:

|     Look       | at |   me  :)  |
|  :----:     |   :----:    |    :---:      |
| File Name     | File Type      | File Size   |
| Manufacturer   | Model     | Image Height  |
| Image Width   | DateTime Original   | DateTime Digitized |
| SubsecTime Digitized  | Last Modified    | GPS Info: Latitude  |
| GPS Info: Longitude  | Time Interval (GMT+)    | Aperture Value  |
| Brightness Value   | Color Space  | Offset  |
| Exposure Bias Value  | Exposure Mode   | Exposure Program  |
| Exposure Time   | FNumber   | Flash  |
| Focal Length  | Focal Length In 35mm Film   | ISO Speed Ratings  |
| Lens Make  | Lens Model   | Lens Specification |
| Metering Mode  | Orientation   | Resolution Unit |
| Scene Capture Type   | Sensing Method   | Shutter Speed Value  |
| Software  | Subject Location  | White Balance  |
| XResolution  | YResolution   | YCbCrPositioning  |


### Installation

Install from git. Download zip file or git clone.

Install python dev and pip3:
```sh
$ apt-get install python3-dev
$ apt-get install python3-pip
```

For production environment: 
```sh
$ pip3 install virtualenv
$ virtualenv envinfuser
```

Enter environment:
```sh
$ cd envinfuser/bin
$ source activate
```

If virtualenv is successfully activated, the command line should look like (envinfuser) ~~~

Infuser requires a number of python libraries to run. Install requirements.txt:
```sh
$ pip3 install -r requirements.txt
```

Set-up Apache2:
```sh
$ sudo apt-get install apache2
$ sudo apt-get install libapache2-mod-wsgi-py3
```
Create conf file:
```sh
$ cd /etc/apache2/sites-available/
$ touch infuser.conf
```
Edit conf file:
```sh
<VirtualHost *:80>
    ServerName (Your domain or IP Address)
    ServerAdmin (Your Email Address)

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    # This is optional, in case you want to redirect people
    # from http to https automatically.
    RewriteEngine On
    RewriteCond %{SERVER_PORT} !^443$
    RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]

</VirtualHost>

<VirtualHost *:443>

    ServerName (Your domain or IP Address)

    Alias /static (Static directory in Django)
    <Directory (Static directory in Django)>
        Require all granted
    </Directory>

    <Directory (Settings.py directory)>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    WSGIDaemonProcess projectinfuser python-path=/opt/envjcho/lib/python3.6/site-packages
    WSGIProcessGroup projectinfuser
    WSGIScriptAlias / (Settings.py directory)/wsgi.py process-group=projectinfuser

    SSLEngine on
    SSLCertificateFile (SSL crt path)
    SSLCertificateKeyFile (SSL KeyFile path)
    SSLCertificateChainFile (SSL crt path)

    ErrorLog ${APACHE_LOG_DIR}/error.log
    Customlog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

Apply conf file to Apache2:
```sh
$ sudo a2ensite <conf path>
$ sudo service apache2 restart or reload
```


Developer
----

Yong In Cho (choyongin21@gmail.com)



**Free Software! Enjoy.**
