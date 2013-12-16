(function($){
    
    $.fn.lazyDOM = function( options ) {
        
        /**
         * options 
         */
        var options = $.extend( {
            start:      0,
            end:        30,
            wrapper:    Object,
            height:     500,
            data:       [],
            buffer:     1 // allows larger buffer if needed
        } , options );
        
        /**
         * init 
         */
        var self    = this,
            models  = [],
            views   = [],
            start   = options.start,
            end     = options.end,
            nb      = 0,
            height  = self.height(),
            wrapper = options.wrapper || self.parent();
        
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
        
        // TODO: use a template
        self._renderItem = function ( item ) {
            // there is a counter, you can use it
            count = start + nb;
            self.views.push( '<li><span class="ui-li-count">' + count + '</span>' + item.mobileId + '</li>' );
            //self.views.push( renderingFn( options.template, ))
        };
        
        /**
         * listeners
         */
        wrapper.one( "scroll" , function () {
            
            // compute the total height of the list
            self.itemHeight = self.children(':first').outerHeight();
            var totalHeight = self.itemHeight * self.models.length;
            self.height( totalHeight );
            
            // set the mask with the wrapper
            wrapper.css({'position':'relative','height':'500px','-webkit-overflow-scrolling':'touch'});
            
            // compute number of visible rows
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
                $(this).css('top',wrapper.scrollTop()+'px');
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
        
        // 1. get models
        
        self.models = options.models || models;
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