'use strict';

(function($){
    
    $.fn.lift = function( options ) {
        
        /**
         * options 
         */
        var self = this,
            options = $.extend( {
            start:      0,
            end:        30,
            wrapper:    self.parent(),
            height:     100,
            models:     [],
            buffer:     1 // allows larger buffer if needed
        } , options );

        /**
         * init vars
         */
        var views   = [],
            wrapper = options.wrapper,
            count   = 0,
            nb      = 0,
            start   = 0,
            end     = 0;

        /**
         * init method
         */
        self.init = function () {
            console.log('initialize');
        },


        /**
         * internal methods
         */ 
        self._renderItems = function ( items ) {   
            nb = 0;      
            $.each( items , function ( index , item ){
                self._renderItem( item );
                nb++;
            });  
        };
        
        self._renderItem = function ( item ) {
            // there is a counter, you can use it
            count = options.start + nb;
            self.views.push( self._renderTemplate( options.template , item ) );
        };

        self._renderTemplate = function ( template , data ) {
            return template.replace(/##(.*?)##/g, function(a, b){
                return data[b];
            });
        }
        
        /**
         * listeners
         */
        wrapper.one( "scroll" , function () {

            // compute the total height of the list
            self.itemHeight = self.children(':first').outerHeight();
            var totalHeight = self.itemHeight * self.models.length;
            self.height( totalHeight );

            // set the mask with the wrapper
            //wrapper.css({'position':'relative','height':options.height+'px','-webkit-overflow-scrolling':'touch'});
            
            // compute the number of visible rows
            // we can do it only after the first render
            self.visibleRows = Math.floor( wrapper.height() / self.itemHeight );
            
        });
        
        wrapper.bind( "scroll" , function ( e ) {

            // exception
            if( wrapper.scrollTop() >= self.height() ) {
                return false;
            }
            
            // get the start number
            start = Math.floor( wrapper.scrollTop() / self.itemHeight );
            end = start + Math.round( self.visibleRows * options.buffer ) + 1;
            
            // refresh the view
            self.empty();
            self._renderItems( self.models.slice( start , end ) );
            self.html( self.views[0] ).css({'position':'relative'});
            delete self.views[0];
            self.append( self.views );
            delete self.views;
            self.views = [];
            
            //css
            self.children('li').each(function(i,e){
                $(this).css('position','absolute');
                $(this).css('left','0');
                $(this).css('right','0');
                $(this).css('top',wrapper.scrollTop() + i*self.itemHeight + 'px');
            });
            
            // trigger a custom event
            self.trigger( 'rendered' );
            
        });  
        
        /**
         * main 
         * 1. get models
         * 2. force scrollbar
         * 3. get views and create partials
         * 4. refresh the main view with partials
         */
        
        self.init();

        // 1. get models
        self.models = options.models;
        self.views = views;

        // 2. force scrollbar
        wrapper.height(options.height).css('overflow-y','scroll');
        
        // 3. get views & create partials
        self._renderItems( self.models.slice( options.start , options.end ) );    
   
        // 4. refresh the main view with partials
        self.html( self.views );
        self.views = [];
        
        // trigger a custom event
        self.trigger( 'rendered' );
     
        /**
         * chaining
         */ 
        return this;
        
    };
    
})(jQuery);