# Lift #

---

## What's that ? ##

A jquery plugin for long lists optimised for mobile devices.

You can now display more than 100,000 rows without lacking of performance.

The Lift jquery plugin generates just one collection of DOM nodes and uses always them to display your data. You avoid flow & reflow and you save precious milliseconds.

*For developers: this plugin was created with KISS & DRY principles in mind. Don't hesitate to fork the project and to improve the code.*

---

## Demos & Examples ##

[http://christianbarras.com/works/lift](http://christianbarras.com/works/lift "Lift - Demos & Examples")

---

## How to use it ? ##

Lift depends on jQuery. Include them both in end of your HTML code:

    <script src="jquery.js" type="text/javascript"></script>
    <script src="jquery.lift.js" type="text/javascript"></script>

### HTML ###

    <div id="wrapper">
      <ul id="longlist">
      </ul>
    </div>
    
### JS ###

    $(document).bind("mobileinit", function(){
            
      $('#longlist').lift({
        wrapper: $("#wrapper"),
        models: data
      });
          
      // Lift triggers an event each render process is finished      
      $("#longlist").on( "rendered" , function(){
        $(this).listview( "refresh" );
      });
                
    });

### CSS ###

No CSS hack needed.

---

## Methods, Options and Events ##

### Methods ###

    $('#myul').lift( options );

### Options ###

* **Height** Integer which sets the height of the list
* **Data** Array of models
* **Wrapper** jQuery Object, the div that contains the list
* **Start** Used creating the list the first time (before scrolling)
* **End** Used creating the list the first time (before scrolling)

### Events ###

Todo

---

## License ##

This plugin is available under the [Creative Commons License](https://github.com/tirabc/lift/blob/master/CC-LICENSE.txt "CC-BY-NC License for Lift jquery plugin").