(function($){
    $.fn.lazynity = function( options ) {
        
        /**
         * options 
         */
        var options = $.extend( {
            start:          0,
            treshold:       40,
            renderingFn:    function(){},
            template:       "",
            height:         200 // mandatory
        } , options );
        
        /**
         * init 
         */
        var self    = this,
            models  = [],
            views   = [],
            start   = options.start,
            end     = options.start + options.treshold,
            nb      = 0;
        
        /**
         * internal methods
         */ 
        self.init = function () {
            
            self.height( options.height );
            self.css( 'overflow-y' , 'scroll' );
            
        };
         
        self._renderItems = function ( items ) {         
            $.each( items , function ( index , item ){
                self._renderItem( item );
                nb++;
            });
            start = start + options.treshold;
            end = end + options.treshold;   
        };
        
        self._renderItem = function ( item ) {
            self.views.push( options.renderingFn( options.template, item ) );
        };
     
        /**
         * listeners
         */
        self.scroll(function(e){
         
            // reload when reaching the end
            if( self.scrollTop() + self.height() >= self.get()[0].scrollHeight - 10 ) {

                self._renderItems( self.models.slice( start , end ) );
                self.append( self.views );
                self.views = [];
                self.trigger( 'rendered' );
 
            }
            
        });
        
        /**
         * main 
         * 0. init
         * 1. get models
         * 2. get views and create partials
         * 3. refresh the main view with partials
         * 4. trigger a rendered event
         * 5. detect scroll problem
         */
        
        // 0. init
        
        self.init();
        
        // 1. get models
        
        self.models = options.models || models;
        self.views = views;
        
        // 2. get views & create partials
        
        self._renderItems( self.models.slice( start , end ) );
        
        // 3. refresh the main view with partials
        
        self.append( self.views );
        self.views = [];
        
        // 4. trigger a rendered event
        
        self.trigger( 'rendered' );
               
        
        /**
         * chaining
         */ 
        return this;
        
    };
    
})(jQuery);