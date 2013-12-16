# LazyDOM #

---

## What's that ? ##

A jquery plugin for long lists optimised for mobile devices.

You can now display more than 100,000 rows without lacking of performance.

The LazyDOM jquery plugin generates just one collection of DOM nodes and uses always them to display your data. You avoid flow & reflow and you save precious milliseconds.

*For developers: this plugin was created with KISS & DRY principles in mind. Don't hesitate to fork the project and to improve the code.*

---

## Demos & Examples ##

[http://christianbarras.com/works/lazydom](http://christianbarras.com/works/lazydom "LazyDOM - Demos & Examples")

---

## How to use it ? ##

LazyDOM depends on jQuery. Include them both in end of your HTML code:

    <script src="jquery.js" type="text/javascript"></script>
    <script src="jquery.lazydom.js" type="text/javascript"></script>

### HTML ###

    <div id="wrapper">
      <ul id="longlist">
      </ul>
    </div>
    
### JS ###

    $(document).bind("mobileinit", function(){
            
      $('#longlist').lazyDOM({
        wrapper: $("#wrapper"),
        models: ais_data
      });
          
      // LazyDOM triggers an event each render process is finished      
      $("#longlist").on( "rendered" , function(){
        $(this).listview( "refresh" );
      });
                
    });

### CSS ###

No CSS hack needed.

---

## Methods, Options and Events ##

### Methods ###

    $('#myul').lazyDOM( options );

### Options ###

* **Height** Integer which sets the height of the list
* **Data** Array of models
* **Wrapper** jQuery Object, the div that contains the list
* **Start** Used creating the list the first time (before scrolling)
* **End** Used creating the list the first time (before scrolling)

### Events ###



---

## License ##

This plugin is available under the [MIT License](http://github.com/tirabc/lazydom/license.txt "MIT License for LazyDOM juery plugin").