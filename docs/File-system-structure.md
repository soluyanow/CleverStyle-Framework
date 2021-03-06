### Directories tree

* **assets** - css/web components/js/images/fonts
  * **css**
  * **html**
  * **img**
  * **js**
* **blocks**
* **build** [dev] - build tools
* **config** - low level system configuration (DB driver, caching driver, etc.)
* **core**
  * **classes** - basic and supplementary classes
    * **thirdparty** - third party classes
  * **drivers** - drivers, subdirectories names corresponds to the names of classes, that uses them
    * **Cache**
    * **DB**
    * **Storage**
  * **languages** - multilingual user interface translation of core and System module
    * **aliases** - additional aliases for languages
  * **traits** - basic traits used by system core
* **custom** - contains files that are used for system classes customization; can be used for custom system builds; can be created manually for by components
* **install** [dev] - installation instruments
  * **DB** - SQL schemas for every supported DB driver
* **modules**
* **storage**
  * **cache** - FileSystem cache
  * **logs** - logs
  * **public_cache** - public cache (css/js/html)
  * **public** - public directory for external access, directory for Local storage
  * **temp** - directory for temporary files
* **themes** - themes

[dev] - means required only for developing, are not used in production
