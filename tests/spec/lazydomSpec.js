describe("LazyDOM", function() {
  
  
    // Needed in matchers
    window.data = [];
    var list    = $("#mylonglist"),
        wrapper = $("#mywrapper");
  
    it( "should display a very long list within a wrapper very fast" , function(){
        
        list.lazyDOM({
            data:       data,
            wrapper:    wrapper
        });
        
        expect( list ).toBeLazyDOMified( data );
        
    });
    
    it( "should be chainable" , function(){
        
        list.lazyDOM({
            wrapper:    wrapper,
            data:       data
        });
        
        expect( list ).lengthToBeEqualAsOriginalList();
        
    });
    
    it( "should support the one finger scrolling on ipad" , function(){
        
        list.lazyDOM({
            wrapper:    wrapper,
            data:       data
        });

        // TODO: to be done.
        
    });
  
    beforeEach( function(){
        
        window.data = [];
        
        for( var i = 0 ; i < 500000 ; i++ ){
            window.data.push({ id: i , name: 'test'+i });
        }
        
        $('<div id="mywrapper"></div>').appendTo('body');
        $('<ul id="mylonglist"></ul>').appendTo('#mywrapper');

    });
    
    beforeEach( function(){
        
        this.addMatchers({
            
            toBeLazyDOMified: function( data ){
                
                var isLazyDOMified = false;
                if( list.children().length < window.data.length )
                isLazyDOMified = true;
                return isLazyDOMified;
                
            },
            
            lengthToBeEqualAsOriginalList: function(){
                
                return this.actual.length == list.length;
                
            }
            
        });

    });
  
    afterEach( function(){
        
        $('#mywrapper').remove();
        delete data;
        
    });

});